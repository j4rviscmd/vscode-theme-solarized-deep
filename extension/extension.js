const vscode = require("vscode");
const theme = require("../themes/solarized-deep-color-theme.json");

/**
 * Solarized Deep — dynamic depth adjustment.
 *
 * The theme ships with a fixed depth (80%) baked into the .json. This extension
 * reads `solarizedDeep.depth` (0=Deep, 100=Osaka) and overrides the five blended
 * tiers via `workbench.colorCustomizations` / `editor.tokenColorCustomizations`,
 * scoped to the `[Solarized Deep]` selector so other themes are unaffected.
 *
 * At the default depth (80) the overrides are removed and the shipped JSON applies
 * as-is, keeping the user's settings.json clean.
 */

// Five tiers: [name, Deep (0%) anchor, Osaka (100%) anchor].
const TIERS = [
  ["background", "#000a0f", "#00141A"],
  ["foreground", "#93a1a1", "#ADB8B8"],
  ["border", "#021b26", "#002B36"],
  ["selection", "#0a4a5c", "#1A6265"],
  ["subfg", "#839496", "#9EACAD"],
];

const THEME_DEPTH = 80; // depth baked into the shipped theme JSON
const THEME_LABEL = "Solarized Deep";
const SELECTOR = `[${THEME_LABEL}]`;

function hexToRgb(h) {
  return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
}

function blend(deep, osaka, n) {
  const [rd, gd, bd] = hexToRgb(deep);
  const [ro, go, bo] = hexToRgb(osaka);
  const w = n / 100;
  const to = (x) => Math.round(x).toString(16).padStart(2, "0").toUpperCase();
  return "#" + to(rd * (1 - w) + ro * w) + to(gd * (1 - w) + go * w) + to(bd * (1 - w) + bo * w);
}

// Map each tier's THEME_DEPTH value back to its anchors, so a color in the
// theme JSON can be matched to its tier regardless of alpha.
const ANCHORS_AT_DEFAULT = new Map();
for (const [, deep, osaka] of TIERS) {
  ANCHORS_AT_DEFAULT.set(blend(deep, osaka, THEME_DEPTH), [deep, osaka]);
}

function remap(value, depth) {
  // Note: The regex also captures an optional 2-digit alpha suffix (8-digit hex values
  // such as #00283380 in themes/solarized-deep-color-theme.json); the alpha is carried
  // through unchanged and only the RGB part is re-blended (see return below).
  const m = typeof value === "string" ? value.match(/^#([0-9a-fA-F]{6})([0-9a-fA-F]{2})?$/) : null;
  if (!m) return value;
  const rgb = ("#" + m[1]).toUpperCase();
  const alpha = m[2] ? m[2].toUpperCase() : "";
  const anchors = ANCHORS_AT_DEFAULT.get(rgb);
  if (!anchors) return value; // fixed color, leave as-is
  return blend(anchors[0], anchors[1], depth) + alpha;
}

function buildColorOverrides(depth) {
  const overrides = {};
  for (const [key, value] of Object.entries(theme.colors)) {
    // Why: terminal.ansiBlack is Solarized base03 (#002B36) and must stay fixed
    // regardless of depth so terminal ANSI colors remain standard. The value is held
    // in themes/solarized-deep-color-theme.json (see README "Adjustable Depth").
    if (key === "terminal.ansiBlack") continue; // keep Solarized ANSI standard
    const next = remap(value, depth);
    if (next.toUpperCase() !== value.toUpperCase()) {
      overrides[key] = next;
    }
  }
  return overrides;
}

function buildTokenRules(depth) {
  const rules = [];
  for (const token of theme.tokenColors) {
    const fg = token.settings && token.settings.foreground;
    if (typeof fg !== "string" || !fg.startsWith("#")) continue;
    const next = remap(fg, depth);
    if (next.toUpperCase() === fg.toUpperCase()) continue; // fixed color, skip
    const scope = Array.isArray(token.scope) ? token.scope.join(",") : token.scope;
    rules.push({ scope, settings: { foreground: next } });
  }
  return rules;
}

async function applyDepth(depth) {
  depth = Math.max(0, Math.min(100, depth));
  // Why: At the default depth (80) the shipped JSON already encodes this exact blend
  // (CHANGELOG [0.2.0]), so we delete the [Solarized Deep] override block instead of
  // writing it back — this keeps the user's settings.json clean (see header docstring).
  const isDefault = depth === THEME_DEPTH;

  // workbench.colorCustomizations — manage only our [Solarized Deep] section.
  const workbench = vscode.workspace.getConfiguration("workbench");
  // Caution: Read only the Global-scope value so Workspace/Folder colorCustomizations
  // (e.g. per-project overrides for other themes) are not migrated into Global on write.
  const wbGlobal = (workbench.inspect("colorCustomizations") || {}).globalValue;
  const colorCustom = { ...(wbGlobal || {}) };
  if (isDefault) {
    delete colorCustom[SELECTOR];
  } else {
    colorCustom[SELECTOR] = buildColorOverrides(depth);
  }
  // Note: Passing undefined (not {}) removes the colorCustomizations key from
  // settings.json entirely (VSCode update semantics), leaving no empty object behind.
  await workbench.update(
    "colorCustomizations",
    Object.keys(colorCustom).length ? colorCustom : undefined,
    vscode.ConfigurationTarget.Global
  );

  // editor.tokenColorCustomizations — manage only our [Solarized Deep] section.
  const editor = vscode.workspace.getConfiguration("editor");
  // Note: globalValue-only read — same rationale as the workbench colorCustomizations
  // Caution above: avoid lifting Workspace/Folder tokenColorCustomizations into Global on write.
  const edGlobal = (editor.inspect("tokenColorCustomizations") || {}).globalValue;
  const tokenCustom = { ...(edGlobal || {}) };
  if (isDefault) {
    delete tokenCustom[SELECTOR];
  } else {
    const rules = buildTokenRules(depth);
    if (rules.length) tokenCustom[SELECTOR] = { textMateRules: rules };
    else delete tokenCustom[SELECTOR];
  }
  await editor.update(
    "tokenColorCustomizations",
    Object.keys(tokenCustom).length ? tokenCustom : undefined,
    vscode.ConfigurationTarget.Global
  );
}

function activate(context) {
  const apply = () => {
    const depth = vscode.workspace.getConfiguration("solarizedDeep").get("depth", THEME_DEPTH);
    applyDepth(depth).catch((err) => console.error("[solarized-deep]", err));
  };
  apply();
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration("solarizedDeep.depth")) apply();
    })
  );
}

module.exports = { activate };
