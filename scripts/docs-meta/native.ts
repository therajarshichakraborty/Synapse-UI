import type { DocMeta, PropTuple } from "./types";

/**
 * Docs for React Native components (src/components/native).
 * Pages are generated with: bun scripts/generate-docs.ts --only=native
 */

const SETUP =
  '<Callout type="tip" title="First time?">Follow the [React Native setup](/docs/react-native) once: install `react-native-svg` and wrap your app in `PortalHost`.</Callout>';

const STYLE: PropTuple = ["style", "StyleProp<ViewStyle>", undefined, "Merged onto the root view."];

function n(
  slug: string,
  usage: { imports: string; code: string },
  api: DocMeta["api"],
  opts: Partial<DocMeta> = {},
): DocMeta {
  return {
    name: `native-${slug}`,
    preview: `native-${slug}-demo`,
    intro: SETUP,
    usage,
    api,
    ...opts,
  };
}

export const nativeDocs: DocMeta[] = [
  n(
    "text",
    {
      imports: 'import { Text } from "@/components/native/text";',
      code: '<Text variant="h1">Hello</Text>\n<Text variant="muted">Secondary copy</Text>',
    },
    [
      {
        name: "Text",
        description: "Extends React Native `TextProps`.",
        props: [
          [
            "variant",
            '"display" | "h1" | "h2" | "h3" | "h4" | "lead" | "body" | "large" | "small" | "muted" | "caption" | "overline" | "code"',
            '"body"',
            "Type scale preset.",
          ],
          [
            "tone",
            '"default" | "muted" | "brand" | "success" | "warning" | "destructive"',
            undefined,
            "Color token. Muted variants default to muted.",
          ],
          ["align", "TextStyle['textAlign']", undefined, "Text alignment."],
          ["weight", "TextStyle['fontWeight']", undefined, "Override the variant weight."],
        ],
      },
    ],
    {
      a11y: {
        notes:
          'Headings are plain `Text`. Add `accessibilityRole="header"` to screen titles so VoiceOver and TalkBack can jump between them.',
      },
    },
  ),
  n(
    "icon",
    {
      imports: 'import { Icon } from "@/components/native/icon";',
      code: '<Icon name="sparkles" size={20} color="#2563eb" />',
    },
    [
      {
        name: "Icon",
        props: [
          ["name", "IconName", undefined, "One of the bundled icons. `iconNames` lists them all."],
          ["size", "number", "20", "Width and height in points."],
          ["color", "string", "theme foreground", "Stroke color."],
          ["strokeWidth", "number", "2", "Line weight."],
          ["fill", "string", '"none"', "Fill for solid shapes like heart or star."],
        ],
      },
    ],
    {
      extra:
        "## Adding icons\n\nThe set is generated from Lucide. Add names to `scripts/generate-native-icons.mjs` and run `node scripts/generate-native-icons.mjs`, or paste any Lucide icon node into the `icons` map.",
      a11y: {
        notes:
          "Icons are decorative. Give the pressable that wraps an icon an `accessibilityLabel`.",
      },
    },
  ),
  n(
    "button",
    {
      imports: 'import { Button, IconButton } from "@/components/native/button";',
      code: '<Button rightIcon="arrow-right" onPress={next}>Continue</Button>\n<IconButton icon="heart" accessibilityLabel="Like" />',
    },
    [
      {
        name: "Button",
        description: "Extends `PressableProps`.",
        props: [
          [
            "variant",
            '"default" | "brand" | "secondary" | "outline" | "ghost" | "destructive" | "link"',
            '"default"',
            "Visual style.",
          ],
          ["size", '"sm" | "md" | "lg"', '"md"', "Height 36, 46 or 54."],
          ["loading", "boolean", "false", "Shows a spinner and disables presses."],
          ["leftIcon", "IconName", undefined, "Icon before the label."],
          ["rightIcon", "IconName", undefined, "Icon after the label."],
          ["block", "boolean", "false", "Stretch to the parent width."],
          STYLE,
        ],
      },
      {
        name: "IconButton",
        props: [
          ["icon", "IconName", undefined, "The icon to render."],
          ["accessibilityLabel", "string", undefined, "Required. Read by screen readers."],
          ["variant", "ButtonVariant", '"outline"', "Visual style."],
          ["shape", '"rounded" | "circle"', '"rounded"', "Corner style."],
        ],
      },
    ],
    {
      a11y: {
        notes:
          'Uses `accessibilityRole="button"` and reports `disabled` and `busy` states. Icon-only buttons must have an `accessibilityLabel`.',
      },
    },
  ),
  n(
    "toggle",
    {
      imports: 'import { Toggle } from "@/components/native/toggle";',
      code: '<Toggle icon="heart" label="128" accessibilityLabel="Like" />',
    },
    [
      {
        name: "Toggle",
        props: [
          ["icon", "IconName", undefined, "Icon to toggle."],
          ["pressed", "boolean", undefined, "Controlled state."],
          ["defaultPressed", "boolean", "false", "Initial state when uncontrolled."],
          ["onPressedChange", "(pressed: boolean) => void", undefined, "Called on toggle."],
          ["activeColor", "string", undefined, "Defaults to red for heart, amber for star."],
          ["fillWhenActive", "boolean", "true", "Fill the icon while on."],
          ["label", "string", undefined, "Text next to the icon."],
          ["bordered", "boolean", "false", "Draw a pill around it."],
          ["accessibilityLabel", "string", undefined, "Required."],
        ],
      },
    ],
    { a11y: { notes: "Announced as a switch with its checked state." } },
  ),
  n(
    "fab",
    {
      imports: 'import { Fab } from "@/components/native/fab";',
      code: '<Fab\n  actions={[\n    { icon: "camera", label: "Scan", onPress: scan },\n    { icon: "edit", label: "New note", onPress: create },\n  ]}\n/>',
    },
    [
      {
        name: "Fab",
        props: [
          ["icon", "IconName", '"plus"', "Main icon. Rotates 135° when the menu opens."],
          ["label", "string", undefined, "Makes an extended FAB."],
          ["onPress", "() => void", undefined, "Used when there are no actions."],
          ["actions", "{ icon, label, onPress }[]", undefined, "Speed-dial items."],
          [
            "position",
            '"bottom-right" | "bottom-center" | "none"',
            '"bottom-right"',
            "Absolute placement in the parent.",
          ],
          ["offset", "number", "24", "Distance from the edges."],
          STYLE,
        ],
      },
    ],
    { a11y: { notes: "Reports `expanded` when it has a menu. Tapping the scrim closes it." } },
  ),
  n(
    "segmented-control",
    {
      imports: 'import { SegmentedControl } from "@/components/native/segmented-control";',
      code: '<SegmentedControl options={["Day", "Week", "Month"]} value={range} onValueChange={setRange} />',
    },
    [
      {
        name: "SegmentedControl",
        props: [
          ["options", "(string | { value, label?, icon? })[]", undefined, "Segments."],
          ["value", "string", undefined, "Controlled value."],
          ["defaultValue", "string", "first option", "Initial value."],
          ["onValueChange", "(value: string) => void", undefined, "Called on change."],
          ["size", '"sm" | "md"', '"md"', "Height 32 or 40."],
          STYLE,
        ],
      },
    ],
    { a11y: { notes: "Exposed as a tablist; each segment is a tab with a selected state." } },
  ),
  n(
    "input",
    {
      imports: 'import { Input } from "@/components/native/input";',
      code: '<Input leftIcon="mail" placeholder="you@example.com" clearable />\n<Input leftIcon="lock" secureTextEntry revealable />',
    },
    [
      {
        name: "Input",
        description: "Extends `TextInputProps` and forwards its ref.",
        props: [
          ["leftIcon", "IconName", undefined, "Leading icon."],
          ["rightIcon", "IconName", undefined, "Trailing icon."],
          ["clearable", "boolean", "false", "Clear button while there is text."],
          ["revealable", "boolean", "false", "Eye toggle for `secureTextEntry`."],
          ["invalid", "boolean", "false", "Red border and ring."],
          ["size", '"sm" | "md" | "lg"', '"md"', "Height 40, 48 or 56."],
          ["disabled", "boolean", "false", "Not editable."],
          STYLE,
        ],
      },
    ],
    {
      a11y: {
        notes:
          "Pair with `FormField` for a visible label. Clear and reveal buttons have their own labels.",
      },
    },
  ),
  n(
    "textarea",
    {
      imports: 'import { Textarea } from "@/components/native/textarea";',
      code: '<Textarea placeholder="Write a message…" maxLength={280} showCount />',
    },
    [
      {
        name: "Textarea",
        description: "Extends `TextInputProps`.",
        props: [
          ["rows", "number", "4", "Visible lines before scrolling."],
          [
            "showCount",
            "boolean",
            "false",
            "Character counter. Turns amber at 90% of `maxLength`.",
          ],
          ["invalid", "boolean", "false", "Error styling."],
          ["disabled", "boolean", "false", "Not editable."],
          STYLE,
        ],
      },
    ],
  ),
  n(
    "form-field",
    {
      imports: 'import { FormField } from "@/components/native/form-field";',
      code: '<FormField label="Email" error={errors.email}>\n  <Input invalid={!!errors.email} />\n</FormField>',
    },
    [
      {
        name: "FormField",
        props: [
          ["label", "string", undefined, "Label above the control."],
          ["description", "string", undefined, "Helper text. Hidden while `error` is set."],
          ["error", "string", undefined, "Error message with icon."],
          ["required", "boolean", "false", "Adds a red asterisk."],
          ["labelRight", "ReactNode", undefined, "Content beside the label."],
          ["children", "ReactNode", undefined, "The control."],
          STYLE,
        ],
      },
    ],
    { a11y: { notes: 'Errors are announced via `accessibilityLiveRegion="polite"` on Android.' } },
  ),
  n(
    "search-bar",
    {
      imports: 'import { SearchBar } from "@/components/native/search-bar";',
      code: '<SearchBar value={query} onChangeText={setQuery} placeholder="Search" />',
    },
    [
      {
        name: "SearchBar",
        description: "Extends `TextInputProps`.",
        props: [
          ["cancelLabel", "string", '"Cancel"', "Label of the button that slides in on focus."],
          ["onCancel", "() => void", undefined, "Called after clearing and blurring."],
          STYLE,
        ],
      },
    ],
  ),
  n(
    "otp-input",
    {
      imports: 'import { OtpInput } from "@/components/native/otp-input";',
      code: "<OtpInput length={6} groupAfter={3} onComplete={verify} />",
    },
    [
      {
        name: "OtpInput",
        props: [
          ["length", "number", "6", "Number of cells."],
          ["value", "string", undefined, "Controlled code."],
          [
            "onChange",
            "(code: string) => void",
            undefined,
            "Called on every change. Non-digits are stripped.",
          ],
          ["onComplete", "(code: string) => void", undefined, "Called when every cell is filled."],
          ["invalid", "boolean", "false", "Shakes and turns red."],
          ["groupAfter", "number", undefined, "Adds a dash after this many cells."],
          ["autoFocus", "boolean", "false", "Focus on mount."],
          STYLE,
        ],
      },
    ],
    {
      a11y: {
        notes:
          'A single hidden `TextInput` with `textContentType="oneTimeCode"` drives the cells, so iOS and Android SMS autofill work.',
      },
    },
  ),
  n(
    "chat-input",
    {
      imports: 'import { ChatInput } from "@/components/native/chat-input";',
      code: "<ChatInput onSend={send} busy={streaming} onStop={stop} />",
    },
    [
      {
        name: "ChatInput",
        props: [
          ["value", "string", undefined, "Controlled text."],
          ["onChangeText", "(text: string) => void", undefined, "Called on change."],
          ["onSend", "(text: string) => void", undefined, "Receives trimmed text, then clears."],
          ["busy", "boolean", "false", "Swaps send for a stop button."],
          ["onStop", "() => void", undefined, "Pressed while busy."],
          ["actions", "{ icon, label, onPress? }[]", "[plus]", "Leading buttons."],
          ["maxLines", "number", "6", "Grows up to this many lines."],
          STYLE,
        ],
      },
    ],
  ),
  n(
    "checkbox",
    {
      imports: 'import { Checkbox } from "@/components/native/checkbox";',
      code: '<Checkbox label="Remember me" checked={remember} onCheckedChange={setRemember} />',
    },
    [
      {
        name: "Checkbox",
        props: [
          ["checked", 'boolean | "indeterminate"', undefined, "Controlled state."],
          ["defaultChecked", "boolean", "false", "Initial state."],
          ["onCheckedChange", "(checked: boolean) => void", undefined, "Called on toggle."],
          ["label", "string", undefined, "Label text. The whole row is pressable."],
          ["description", "string", undefined, "Secondary text."],
          ["shape", '"square" | "round"', '"square"', "Round suits to-do lists."],
          ["invalid", "boolean", "false", "Red border."],
          ["disabled", "boolean", "false", "Not pressable."],
          STYLE,
        ],
      },
    ],
    { a11y: { notes: "Announced as a checkbox; indeterminate is reported as `mixed`." } },
  ),
  n(
    "radio-group",
    {
      imports: 'import { RadioGroup } from "@/components/native/radio-group";',
      code: '<RadioGroup\n  variant="card"\n  value={plan}\n  onValueChange={setPlan}\n  options={[{ value: "a", label: "Option A" }]}\n/>',
    },
    [
      {
        name: "RadioGroup",
        props: [
          ["options", "{ value, label, description?, icon?, disabled? }[]", undefined, "Choices."],
          ["value", "string", undefined, "Controlled value."],
          ["defaultValue", "string", undefined, "Initial value."],
          ["onValueChange", "(value: string) => void", undefined, "Called on change."],
          ["variant", '"list" | "card"', '"list"', "Compact rows or bordered tiles."],
          STYLE,
        ],
      },
    ],
  ),
  n(
    "switch",
    {
      imports: 'import { Switch } from "@/components/native/switch";',
      code: '<Switch value={enabled} onValueChange={setEnabled} />\n<Switch label="Notifications" description="Push and email" />',
    },
    [
      {
        name: "Switch",
        props: [
          ["value", "boolean", undefined, "Controlled state."],
          ["defaultValue", "boolean", "false", "Initial state."],
          ["onValueChange", "(value: boolean) => void", undefined, "Called on toggle."],
          ["tint", '"success" | "brand" | "primary"', '"success"', "Track color when on."],
          ["size", '"sm" | "md"', '"md"', "51×31 or 40×24."],
          ["label", "string", undefined, "Renders a labeled row."],
          ["description", "string", undefined, "Secondary text."],
          ["disabled", "boolean", "false", "Not pressable."],
          STYLE,
        ],
      },
    ],
  ),
  n(
    "slider",
    {
      imports: 'import { Slider } from "@/components/native/slider";',
      code: "<Slider value={volume} onValueChange={setVolume} formatValue={(v) => `${v}%`} />",
    },
    [
      {
        name: "Slider",
        props: [
          ["value", "number", undefined, "Controlled value."],
          ["defaultValue", "number", "0", "Initial value."],
          ["min", "number", "0", "Minimum."],
          ["max", "number", "100", "Maximum."],
          ["step", "number", "1", "Snap increment."],
          ["onValueChange", "(value: number) => void", undefined, "Called while dragging."],
          ["onSlidingComplete", "(value: number) => void", undefined, "Called on release."],
          ["showValue", "boolean", "true", "Floating value bubble while dragging."],
          ["formatValue", "(value: number) => string", undefined, "Bubble text."],
          STYLE,
        ],
      },
    ],
    {
      a11y: {
        notes:
          "Uses the `adjustable` role and supports increment/decrement accessibility actions (swipe up/down in VoiceOver).",
      },
    },
  ),
  n(
    "stepper",
    {
      imports: 'import { Stepper } from "@/components/native/stepper";',
      code: "<Stepper value={guests} onValueChange={setGuests} min={1} max={10} />",
    },
    [
      {
        name: "Stepper",
        props: [
          ["value", "number", undefined, "Controlled value."],
          ["defaultValue", "number", "0", "Initial value."],
          ["min", "number", "0", "Minimum."],
          ["max", "number", "99", "Maximum."],
          ["step", "number", "1", "Increment."],
          ["unit", "string", undefined, "Caption under the number."],
          ["size", '"sm" | "md"', '"md"', "Control size."],
          STYLE,
        ],
      },
    ],
    { a11y: { notes: "Long-press either button to repeat; the repeat rate accelerates." } },
  ),
  n(
    "select",
    {
      imports: 'import { Select } from "@/components/native/select";',
      code: '<Select\n  title="Country"\n  options={[{ value: "us", label: "United States" }]}\n  value={country}\n  onValueChange={setCountry}\n/>',
    },
    [
      {
        name: "Select",
        props: [
          ["options", "{ value, label, description?, icon? }[]", undefined, "Choices."],
          ["value", "string", undefined, "Controlled value."],
          ["defaultValue", "string", undefined, "Initial value."],
          ["onValueChange", "(value: string) => void", undefined, "Called on choose."],
          ["placeholder", "string", '"Select an option"', "Shown with no value."],
          ["title", "string", undefined, "Sheet title."],
          ["searchable", "boolean", "8+ options", "Adds a filter field."],
          ["invalid", "boolean", "false", "Error styling."],
          ["disabled", "boolean", "false", "Not pressable."],
          STYLE,
        ],
      },
    ],
    {
      a11y: {
        notes:
          "The trigger is a combobox with an `expanded` state; the Android back button closes the sheet.",
      },
    },
  ),
  n(
    "chip",
    {
      imports: 'import { Chip, ChipGroup } from "@/components/native/chip";',
      code: '<ChipGroup multiple options={[{ value: "a", label: "Design" }]} value={tags} onValueChange={setTags} />',
    },
    [
      {
        name: "Chip",
        props: [
          ["label", "string", undefined, "Text."],
          ["selected", "boolean", "false", "Selected styling."],
          ["onPress", "() => void", undefined, "Press handler."],
          ["icon", "IconName", undefined, "Leading icon."],
          ["count", "number", undefined, "Trailing count."],
          ["onRemove", "() => void", undefined, "Shows a remove button."],
        ],
      },
      {
        name: "ChipGroup",
        props: [
          ["options", "{ value, label, icon?, count? }[]", undefined, "Chips."],
          ["value", "string[]", undefined, "Controlled selection."],
          ["multiple", "boolean", "false", "Allow several selections."],
          ["scrollable", "boolean", "false", "Single horizontal scrolling row."],
          ["onValueChange", "(value: string[]) => void", undefined, "Called on change."],
        ],
      },
    ],
  ),
  n(
    "rating",
    {
      imports: 'import { Rating } from "@/components/native/rating";',
      code: '<Rating value={stars} onValueChange={setStars} />\n<Rating readOnly value={4.6} showValue count="2.4k" />',
    },
    [
      {
        name: "Rating",
        props: [
          ["value", "number", undefined, "Controlled value. Fractions render in read-only mode."],
          ["defaultValue", "number", "0", "Initial value."],
          ["onValueChange", "(value: number) => void", undefined, "Called on tap."],
          ["max", "number", "5", "Number of stars."],
          ["size", "number", "28", "Star size."],
          ["readOnly", "boolean", "false", "Display only."],
          ["showValue", "boolean", "false", "Show the number."],
          ["count", "string", undefined, "Review count after the value."],
          ["color", "string", '"#f5a524"', "Star color."],
          STYLE,
        ],
      },
    ],
  ),
  n(
    "keypad",
    {
      imports: 'import { Keypad } from "@/components/native/keypad";',
      code: "<Keypad length={4} error={wrong} onComplete={check} />",
    },
    [
      {
        name: "Keypad",
        props: [
          ["length", "number", "4", "PIN length. 0 hides the dots for amount entry."],
          ["value", "string", undefined, "Controlled value."],
          ["onChange", "(value: string) => void", undefined, "Called on every key."],
          ["onComplete", "(value: string) => void", undefined, "Called when full."],
          ["error", "boolean", "false", "Shakes, turns red and clears."],
          ["extraKey", "{ label?, icon?, onPress }", undefined, "Bottom-left key, e.g. Face ID."],
          STYLE,
        ],
      },
    ],
    { a11y: { notes: "Long-press delete to clear everything." } },
  ),
  n(
    "card",
    {
      imports:
        'import { Card, CardContent, CardFooter, CardHeader } from "@/components/native/card";',
      code: '<Card variant="elevated">\n  <CardHeader title="Title" description="Description" />\n  <CardContent>…</CardContent>\n  <CardFooter>…</CardFooter>\n</Card>',
    },
    [
      {
        name: "Card",
        props: [
          ["variant", '"outline" | "elevated" | "filled" | "ghost"', '"outline"', "Surface style."],
          ["onPress", "() => void", undefined, "Makes the card pressable with spring feedback."],
          STYLE,
        ],
      },
      {
        name: "CardHeader",
        props: [
          ["title", "string", undefined, "Heading."],
          ["description", "string", undefined, "Subheading."],
          ["right", "ReactNode", undefined, "Trailing content."],
        ],
      },
    ],
  ),
  n(
    "avatar",
    {
      imports: 'import { Avatar, AvatarGroup } from "@/components/native/avatar";',
      code: '<Avatar src={user.photo} name={user.name} status="online" />\n<AvatarGroup people={members} max={4} />',
    },
    [
      {
        name: "Avatar",
        props: [
          ["src", "string", undefined, "Image URL. Falls back to initials on error."],
          ["name", "string", undefined, "Initials, fallback color and accessibility label."],
          ["size", "number", "44", "Diameter."],
          ["status", '"online" | "away" | "busy" | "offline"', undefined, "Presence dot."],
          ["ring", "boolean", "false", "Story-style ring."],
          ["shape", '"circle" | "rounded"', '"circle"', "Corner style."],
        ],
      },
      {
        name: "AvatarGroup",
        props: [
          ["people", "{ src?, name }[]", undefined, "People to show."],
          ["max", "number", "4", "Shown before collapsing to +N."],
          ["size", "number", "36", "Diameter."],
        ],
      },
    ],
  ),
  n(
    "badge",
    {
      imports: 'import { Badge } from "@/components/native/badge";',
      code: '<Badge tone="success" dot>Online</Badge>',
    },
    [
      {
        name: "Badge",
        props: [
          [
            "tone",
            '"neutral" | "brand" | "success" | "warning" | "destructive"',
            '"neutral"',
            "Color.",
          ],
          ["variant", '"solid" | "soft" | "outline"', '"soft"', "Fill style."],
          ["icon", "IconName", undefined, "Leading icon."],
          ["dot", "boolean", "false", "Leading status dot."],
          ["size", '"sm" | "md"', '"md"', "Height 20 or 24."],
          STYLE,
        ],
      },
    ],
  ),
  n(
    "separator",
    {
      imports: 'import { Separator } from "@/components/native/separator";',
      code: '<Separator />\n<Separator label="or" />',
    },
    [
      {
        name: "Separator",
        props: [
          ["orientation", '"horizontal" | "vertical"', '"horizontal"', "Direction."],
          ["label", "string", undefined, "Centered text."],
          ["inset", "number", "0", "Left inset."],
          STYLE,
        ],
      },
    ],
  ),
  n(
    "skeleton",
    {
      imports: 'import { Skeleton, SkeletonText } from "@/components/native/skeleton";',
      code: "<Skeleton circle={44} />\n<SkeletonText lines={3} />",
    },
    [
      {
        name: "Skeleton",
        props: [
          ["width", "DimensionValue", '"100%"', "Width."],
          ["height", "DimensionValue", "16", "Height."],
          ["radius", "number", "8", "Corner radius."],
          ["circle", "number", undefined, "Diameter of a circular skeleton."],
          STYLE,
        ],
      },
      {
        name: "SkeletonText",
        props: [
          ["lines", "number", "3", "Line count; the last is shorter."],
          ["gap", "number", "10", "Space between lines."],
        ],
      },
    ],
    {
      a11y: {
        notes:
          "Every skeleton on screen pulses from one shared clock, so they stay in sync and cost a single animation.",
      },
    },
  ),
  n(
    "progress",
    {
      imports: 'import { Progress } from "@/components/native/progress";',
      code: '<Progress value={64} label="Uploading" showValue />',
    },
    [
      {
        name: "Progress",
        props: [
          ["value", "number", undefined, "0–100. Omit for indeterminate."],
          ["label", "string", undefined, "Label above the bar."],
          ["showValue", "boolean", "false", "Percentage on the right."],
          ["size", '"sm" | "md" | "lg"', '"md"', "Bar thickness."],
          [
            "tone",
            '"primary" | "brand" | "success" | "warning" | "destructive"',
            '"primary"',
            "Bar color.",
          ],
          STYLE,
        ],
      },
    ],
  ),
  n(
    "progress-ring",
    {
      imports: 'import { ProgressRing } from "@/components/native/progress-ring";',
      code: '<ProgressRing value={72} colors={["#22d3ee", "#6366f1"]} label="Daily goal" />',
    },
    [
      {
        name: "ProgressRing",
        props: [
          ["value", "number", undefined, "0–100."],
          ["size", "number", "120", "Diameter."],
          ["strokeWidth", "number", "10", "Ring thickness."],
          ["colors", "[string, string]", "brand", "Gradient stops."],
          ["label", "string", undefined, "Caption under the percentage."],
          ["children", "ReactNode", undefined, "Replaces the centered percentage."],
          STYLE,
        ],
      },
    ],
  ),
  n(
    "spinner",
    {
      imports: 'import { Spinner } from "@/components/native/spinner";',
      code: '<Spinner size="md" />',
    },
    [
      {
        name: "Spinner",
        props: [
          ["size", '"sm" | "md" | "lg" | number', '"md"', "16, 24, 36 or a custom size."],
          ["color", "string", "foreground", "Arc color."],
          STYLE,
        ],
      },
    ],
  ),
  n(
    "alert",
    {
      imports: 'import { Alert } from "@/components/native/alert";',
      code: '<Alert tone="warning" title="Storage almost full" description="You\'ve used 92%." />',
    },
    [
      {
        name: "Alert",
        props: [
          ["title", "string", undefined, "Heading."],
          ["description", "string", undefined, "Body."],
          [
            "tone",
            '"info" | "success" | "warning" | "destructive" | "neutral"',
            '"info"',
            "Color and default icon.",
          ],
          ["icon", "IconName", undefined, "Override the icon."],
          ["action", "{ label, onPress }", undefined, "Inline action link."],
          ["onDismiss", "() => void", undefined, "Shows a close button."],
          STYLE,
        ],
      },
    ],
  ),
  n(
    "banner",
    {
      imports: 'import { Banner } from "@/components/native/banner";',
      code: '<Banner title="Meet Synapse AI" action={{ label: "Try it", onPress }} onDismiss={hide} />',
    },
    [
      {
        name: "Banner",
        props: [
          ["title", "string", undefined, "Heading."],
          ["description", "string", undefined, "Body."],
          ["icon", "IconName", '"sparkles"', "Leading icon."],
          ["action", "{ label, onPress }", undefined, "White pill button."],
          ["onDismiss", "() => void", undefined, "Animates out, then calls this."],
          ["colors", "[string, string]", "blue → violet", "Gradient."],
          STYLE,
        ],
      },
    ],
  ),
  n(
    "empty-state",
    {
      imports: 'import { EmptyState } from "@/components/native/empty-state";',
      code: '<EmptyState icon="inbox" title="No messages" action={{ label: "Compose", onPress }} />',
    },
    [
      {
        name: "EmptyState",
        props: [
          ["title", "string", undefined, "Heading."],
          ["description", "string", undefined, "Body."],
          ["icon", "IconName", '"inbox"', "Illustration icon."],
          ["action", "{ label, onPress }", undefined, "Primary button."],
          ["secondaryAction", "{ label, onPress }", undefined, "Ghost button."],
          STYLE,
        ],
      },
    ],
  ),
  n(
    "list",
    {
      imports: 'import { ListGroup, ListItem } from "@/components/native/list";',
      code: '<ListGroup header="General">\n  <ListItem title="Wi-Fi" icon="wifi" iconColor="#3b82f6" value="Home" onPress={open} />\n  <ListItem title="Dark mode" icon="moon" trailing={<Switch />} />\n</ListGroup>',
    },
    [
      {
        name: "ListGroup",
        props: [
          ["header", "string", undefined, "Uppercase heading."],
          ["footer", "string", undefined, "Helper text below."],
          STYLE,
        ],
      },
      {
        name: "ListItem",
        props: [
          ["title", "string", undefined, "Primary text."],
          ["subtitle", "string", undefined, "Secondary text."],
          ["icon", "IconName", undefined, "Icon tile."],
          ["iconColor", "string", undefined, "Tile background; the icon turns white."],
          ["leading", "ReactNode", undefined, "Custom leading element."],
          ["value", "string", undefined, "Right-aligned value."],
          ["trailing", "ReactNode", undefined, "Custom trailing element."],
          ["onPress", "() => void", undefined, "Makes the row pressable."],
          ["chevron", "boolean", "auto", "Disclosure chevron."],
          ["destructive", "boolean", "false", "Red title."],
        ],
      },
    ],
  ),
  n(
    "accordion",
    {
      imports: 'import { Accordion } from "@/components/native/accordion";',
      code: '<Accordion items={[{ value: "a", title: "Question", content: "Answer" }]} />',
    },
    [
      {
        name: "Accordion",
        props: [
          [
            "items",
            "{ value, title, content }[]",
            undefined,
            "Sections. `content` can be a string or nodes.",
          ],
          ["type", '"single" | "multiple"', '"single"', "How many can be open."],
          ["defaultValue", "string[]", "[]", "Initially open sections."],
          ["variant", '"plain" | "separated"', '"plain"', "Divided list or separate cards."],
          STYLE,
        ],
      },
    ],
    { a11y: { notes: "Each trigger reports its `expanded` state." } },
  ),
  n(
    "tabs",
    {
      imports: 'import { Tabs } from "@/components/native/tabs";',
      code: '<Tabs value={tab} onValueChange={setTab} items={[{ value: "a", label: "Inbox", badge: 4 }]} />',
    },
    [
      {
        name: "Tabs",
        props: [
          ["items", "{ value, label, icon?, badge? }[]", undefined, "Tabs."],
          ["value", "string", undefined, "Controlled value."],
          ["defaultValue", "string", "first item", "Initial value."],
          ["onValueChange", "(value: string) => void", undefined, "Called on change."],
          ["variant", '"underline" | "pill"', '"underline"', "Indicator style."],
          ["fill", "boolean", "true", "Stretch tabs evenly."],
          STYLE,
        ],
      },
    ],
  ),
  n(
    "stat-card",
    {
      imports: 'import { StatCard } from "@/components/native/stat-card";',
      code: '<StatCard label="Revenue" value="$48,290" delta={12.4} trend={data} />',
    },
    [
      {
        name: "StatCard",
        props: [
          ["label", "string", undefined, "Metric name."],
          ["value", "string", undefined, "Formatted value."],
          ["delta", "number", undefined, "Percent change; sign picks the color."],
          ["caption", "string", undefined, "Text after the delta."],
          ["icon", "IconName", undefined, "Corner icon."],
          ["trend", "number[]", undefined, "Sparkline data."],
          STYLE,
        ],
      },
    ],
  ),
  n(
    "timeline",
    {
      imports: 'import { Timeline } from "@/components/native/timeline";',
      code: '<Timeline events={[{ title: "Ordered", time: "9:41" }, { title: "Shipped", status: "current" }]} />',
    },
    [
      {
        name: "Timeline",
        props: [
          [
            "events",
            '{ title, description?, time?, icon?, status?: "done" | "current" | "upcoming" }[]',
            undefined,
            "Events, top to bottom.",
          ],
          STYLE,
        ],
      },
    ],
  ),
  n(
    "steps",
    {
      imports: 'import { Steps } from "@/components/native/steps";',
      code: '<Steps steps={["Account", "Profile", "Done"]} current={1} />',
    },
    [
      {
        name: "Steps",
        props: [
          ["steps", "string[]", undefined, "Step labels."],
          ["current", "number", undefined, "Active step index."],
          ["variant", '"dots" | "bar"', '"dots"', "Numbered nodes or segmented bar."],
          STYLE,
        ],
      },
    ],
  ),
  n(
    "carousel",
    {
      imports: 'import { Carousel } from "@/components/native/carousel";',
      code: "<Carousel data={items} renderItem={(item) => <MediaCard {...item} />} />",
    },
    [
      {
        name: "Carousel",
        props: [
          ["data", "T[]", undefined, "Items."],
          ["renderItem", "(item: T, index: number) => ReactNode", undefined, "Renders a slide."],
          ["itemWidth", "number", "0.84", "Slide width as a fraction of the container."],
          ["gap", "number", "12", "Space between slides."],
          ["scaleInactive", "boolean", "true", "Shrink and fade off-center slides."],
          ["showIndicator", "boolean", "true", "Page dots below."],
          ["onIndexChange", "(index: number) => void", undefined, "Called on snap."],
          STYLE,
        ],
      },
    ],
  ),
  n(
    "page-indicator",
    {
      imports: 'import { PageIndicator } from "@/components/native/page-indicator";',
      code: "<PageIndicator count={3} progress={page} onPress={setPage} />",
    },
    [
      {
        name: "PageIndicator",
        props: [
          ["count", "number", undefined, "Number of pages."],
          [
            "progress",
            "number | Animated.Value",
            undefined,
            "Current page. Pass scrollX / width to track the finger.",
          ],
          ["onPress", "(index: number) => void", undefined, "Makes dots pressable."],
          ["activeColor", "string", "foreground", "Active dot."],
          ["inactiveColor", "string", "borderStrong", "Other dots."],
          STYLE,
        ],
      },
    ],
  ),
  n(
    "media-card",
    {
      imports: 'import { MediaCard } from "@/components/native/media-card";',
      code: '<MediaCard image={uri} title="Kyoto" subtitle="Japan" meta="$1,240" eyebrow="Popular" />',
    },
    [
      {
        name: "MediaCard",
        props: [
          ["image", "string", undefined, "Image URL."],
          ["title", "string", undefined, "Title over the scrim."],
          ["subtitle", "string", undefined, "Secondary text."],
          ["eyebrow", "string", undefined, "Frosted pill top-left."],
          ["action", "{ icon, label, active?, onPress }", undefined, "Round button top-right."],
          ["meta", "string", undefined, "Bottom-right text, e.g. a price."],
          ["aspectRatio", "number", "0.8", "Width / height."],
          ["onPress", "() => void", undefined, "Press handler."],
          STYLE,
        ],
      },
    ],
  ),
  n(
    "plan-card",
    {
      imports: 'import { PlanCard } from "@/components/native/plan-card";',
      code: "<PlanCard plan={plan} selected={selected === plan.id} onPress={() => setSelected(plan.id)} />",
    },
    [
      {
        name: "PlanCard",
        props: [
          [
            "plan",
            "{ id, name, price, period?, description?, features?, badge? }",
            undefined,
            "Plan data.",
          ],
          ["selected", "boolean", "false", "Selected styling."],
          ["onPress", "() => void", undefined, "Press handler."],
          STYLE,
        ],
      },
    ],
    { a11y: { notes: "Announced as a radio so a list of plans reads as one choice." } },
  ),
  n(
    "chat-bubble",
    {
      imports: 'import { ChatBubble } from "@/components/native/chat-bubble";',
      code: '<ChatBubble from="me" time="9:41" status="read">See you there!</ChatBubble>',
    },
    [
      {
        name: "ChatBubble",
        props: [
          ["children", "ReactNode", undefined, "Message. Strings are styled for you."],
          ["from", '"me" | "them"', '"them"', "Alignment and color."],
          ["time", "string", undefined, "Timestamp."],
          ["status", '"sending" | "sent" | "read"', undefined, "Receipt for your messages."],
          ["tail", "boolean", "true", "Turn off for grouped messages."],
          ["animate", "boolean", "true", "Spring in on mount."],
          STYLE,
        ],
      },
    ],
  ),
  n(
    "typing-indicator",
    {
      imports: 'import { TypingIndicator } from "@/components/native/typing-indicator";',
      code: "<TypingIndicator />",
    },
    [
      {
        name: "TypingIndicator",
        props: [
          ["bubble", "boolean", "true", "Wrap in a chat bubble."],
          ["color", "string", "mutedForeground", "Dot color."],
          STYLE,
        ],
      },
    ],
  ),
  n(
    "number-ticker",
    {
      imports: 'import { NumberTicker } from "@/components/native/number-ticker";',
      code: '<NumberTicker value={12480.5} prefix="$" decimals={2} />',
    },
    [
      {
        name: "NumberTicker",
        props: [
          [
            "value",
            "number",
            undefined,
            "Target value. Changing it animates from the current one.",
          ],
          ["from", "number", "0", "Start value on mount."],
          ["duration", "number", "1200", "Milliseconds."],
          ["decimals", "number", "0", "Fraction digits."],
          ["prefix", "string", '""', "e.g. $"],
          ["suffix", "string", '""', "e.g. %"],
          ["grouping", "boolean", "true", "Thousands separators."],
          ["style", "StyleProp<TextStyle>", undefined, "Text style."],
        ],
      },
    ],
  ),
  n(
    "calendar-strip",
    {
      imports: 'import { CalendarStrip } from "@/components/native/calendar-strip";',
      code: '<CalendarStrip value={date} onValueChange={setDate} marked={["2026-06-12"]} />',
    },
    [
      {
        name: "CalendarStrip",
        props: [
          ["value", "Date", undefined, "Selected day."],
          ["onValueChange", "(date: Date) => void", undefined, "Called on tap."],
          ["start", "Date", "start of week", "First day shown."],
          ["days", "number", "14", "Days to show."],
          ["marked", "string[]", "[]", "YYYY-MM-DD dates with an event dot."],
          ["locale", "string", '"en-US"', "Weekday names."],
          STYLE,
        ],
      },
    ],
  ),
  n(
    "bar-chart",
    {
      imports: 'import { BarChart } from "@/components/native/bar-chart";',
      code: '<BarChart data={[{ label: "Mon", value: 6400 }]} formatValue={(v) => `${v} steps`} />',
    },
    [
      {
        name: "BarChart",
        props: [
          ["data", "{ label, value }[]", undefined, "Bars."],
          ["height", "number", "160", "Plot height."],
          ["defaultActive", "number", "last", "Initially highlighted bar."],
          ["formatValue", "(v: number) => string", undefined, "Readout text."],
          ["color", "string", "brand", "Active bar color."],
          STYLE,
        ],
      },
    ],
  ),
  n(
    "sparkline",
    {
      imports: 'import { Sparkline } from "@/components/native/sparkline";',
      code: "<Sparkline data={[4, 8, 6, 12, 10, 16]} height={56} />",
    },
    [
      {
        name: "Sparkline",
        props: [
          ["data", "number[]", undefined, "Values."],
          ["height", "number", "56", "Height; width fills the parent."],
          ["color", "string", "brand", "Line color."],
          ["strokeWidth", "number", "2", "Line weight."],
          ["fill", "boolean", "true", "Gradient area."],
          ["showEnd", "boolean", "true", "Dot on the last point."],
          STYLE,
        ],
      },
    ],
  ),
  n(
    "dialog",
    {
      imports: 'import { Dialog } from "@/components/native/dialog";',
      code: '<Dialog open={open} onOpenChange={setOpen} title="Rename" footer={<Button onPress={save}>Save</Button>}>\n  <Input />\n</Dialog>',
    },
    [
      {
        name: "Dialog",
        props: [
          ["open", "boolean", undefined, "Visibility."],
          ["onOpenChange", "(open: boolean) => void", undefined, "Called to close."],
          ["title", "string", undefined, "Heading."],
          ["description", "string", undefined, "Subheading."],
          ["footer", "ReactNode", undefined, "Button row."],
          ["dismissible", "boolean", "true", "Close on backdrop and back button."],
          ["showClose", "boolean", "true", "Close button top-right."],
          STYLE,
        ],
      },
    ],
    {
      a11y: {
        notes:
          "Marked `accessibilityViewIsModal` so VoiceOver ignores content behind it. Renders into `PortalHost`.",
      },
    },
  ),
  n(
    "alert-dialog",
    {
      imports: 'import { AlertDialog } from "@/components/native/alert-dialog";',
      code: '<AlertDialog open={open} onOpenChange={setOpen} destructive title="Delete?" onConfirm={remove} />',
    },
    [
      {
        name: "AlertDialog",
        props: [
          ["open", "boolean", undefined, "Visibility."],
          ["onOpenChange", "(open: boolean) => void", undefined, "Called to close."],
          ["title", "string", undefined, "Question."],
          ["description", "string", undefined, "Consequences."],
          ["icon", "IconName", undefined, "Header icon."],
          ["confirmLabel", "string", '"Continue"', "Confirm button."],
          ["cancelLabel", "string", '"Cancel"', "Cancel button."],
          ["destructive", "boolean", "false", "Red confirm."],
          [
            "onConfirm",
            "() => void | Promise<void>",
            undefined,
            "Spinner until the promise settles, then closes.",
          ],
          ["onCancel", "() => void", undefined, "Called on cancel."],
        ],
      },
    ],
    { a11y: { notes: "Can't be dismissed by tapping outside; the user must choose." } },
  ),
  n(
    "bottom-sheet",
    {
      imports: 'import { BottomSheet } from "@/components/native/bottom-sheet";',
      code: '<BottomSheet open={open} onOpenChange={setOpen} title="Share" snapPoints={[0.4, 0.9]}>\n  …\n</BottomSheet>',
    },
    [
      {
        name: "BottomSheet",
        props: [
          ["open", "boolean", undefined, "Visibility."],
          [
            "onOpenChange",
            "(open: boolean) => void",
            undefined,
            "Called on drag-close, backdrop or back.",
          ],
          ["title", "string", undefined, "Heading."],
          ["description", "string", undefined, "Subheading."],
          [
            "snapPoints",
            "number[]",
            "content height",
            "Heights as screen fractions, smallest first.",
          ],
          ["bottomInset", "number", "28", "Padding for the home indicator."],
          STYLE,
        ],
      },
    ],
    {
      a11y: {
        notes: "Drag the handle or header. A fast downward fling closes it from any snap point.",
      },
    },
  ),
  n(
    "action-sheet",
    {
      imports: 'import { ActionSheet } from "@/components/native/action-sheet";',
      code: '<ActionSheet open={open} onOpenChange={setOpen} options={[{ label: "Delete", destructive: true, onPress }]} />',
    },
    [
      {
        name: "ActionSheet",
        props: [
          ["open", "boolean", undefined, "Visibility."],
          ["onOpenChange", "(open: boolean) => void", undefined, "Called to close."],
          ["title", "string", undefined, "Heading."],
          ["message", "string", undefined, "Explanation."],
          [
            "options",
            "{ label, icon?, destructive?, disabled?, onPress }[]",
            undefined,
            "Actions.",
          ],
          ["cancelLabel", "string", '"Cancel"', "Separate cancel button."],
          ["bottomInset", "number", "24", "Bottom padding."],
        ],
      },
    ],
  ),
  n(
    "dropdown-menu",
    {
      imports: 'import { DropdownMenu } from "@/components/native/dropdown-menu";',
      code: '<DropdownMenu items={[{ label: "Edit", icon: "edit", onPress: edit }]}>\n  {(open) => <IconButton icon="more-horizontal" accessibilityLabel="More" onPress={open} />}\n</DropdownMenu>',
    },
    [
      {
        name: "DropdownMenu",
        props: [
          [
            "items",
            "MenuItem[]",
            undefined,
            'Items, `{ type: "separator" }` and `{ type: "label", label }`.',
          ],
          ["children", "(open: () => void) => ReactNode", undefined, "Render the trigger."],
          ["align", '"start" | "end"', '"end"', "Alignment to the trigger."],
          ["width", "number", "230", "Menu width."],
          STYLE,
        ],
      },
    ],
    { a11y: { notes: "Positioned with `measureInWindow`, clamped to the screen edges." } },
  ),
  n(
    "tooltip",
    {
      imports: 'import { Tooltip } from "@/components/native/tooltip";',
      code: '<Tooltip content="Share">\n  <ShareIcon />\n</Tooltip>',
    },
    [
      {
        name: "Tooltip",
        props: [
          ["content", "string", undefined, "Tooltip text. Also the accessibility hint."],
          ["children", "ReactNode", undefined, "Trigger. Avoid nested pressables."],
          ["trigger", '"longPress" | "press"', '"longPress"', "Gesture that opens it."],
          ["duration", "number", "1800", "Auto-hide delay."],
          STYLE,
        ],
      },
    ],
  ),
  n(
    "drawer",
    {
      imports: 'import { Drawer, DrawerItem } from "@/components/native/drawer";',
      code: '<Drawer open={open} onOpenChange={setOpen}>\n  <DrawerItem label="Home" icon="home" active />\n</Drawer>',
    },
    [
      {
        name: "Drawer",
        props: [
          ["open", "boolean", undefined, "Visibility."],
          ["onOpenChange", "(open: boolean) => void", undefined, "Called to close."],
          ["side", '"left" | "right"', '"left"', "Edge."],
          ["size", "number", "0.82", "Width as a screen fraction."],
          ["topInset", "number", "56", "Top padding."],
          STYLE,
        ],
      },
      {
        name: "DrawerItem",
        props: [
          ["label", "string", undefined, "Text."],
          ["icon", "IconName", undefined, "Icon."],
          ["active", "boolean", "false", "Selected styling."],
          ["badge", "string | number", undefined, "Count pill."],
          ["onPress", "() => void", undefined, "Press handler."],
        ],
      },
    ],
  ),
  n(
    "toast",
    {
      imports: 'import { Toaster, toast } from "@/components/native/toast";',
      code: '// once, at the root\n<Toaster />\n\n// anywhere\ntoast.success("Saved", { description: "IMG_2048.HEIC" });\ntoast.promise(upload(), { loading: "Uploading…", success: "Done", error: "Failed" });',
    },
    [
      {
        name: "toast",
        description:
          "`toast(title, options)`, plus `.success`, `.error`, `.warning`, `.info`, `.loading`, `.promise` and `.dismiss(id?)`.",
        props: [
          ["description", "string", undefined, "Second line."],
          ["duration", "number", "3500", "Milliseconds. `Infinity` keeps it."],
          ["action", "{ label, onPress }", undefined, "Inline button."],
          ["icon", "IconName", undefined, "Icon for default toasts."],
        ],
      },
      { name: "Toaster", props: [["offset", "number", "56", "Distance from the top edge."]] },
    ],
    { a11y: { notes: "Up to three toasts stack with depth. Swipe up to dismiss." } },
  ),
  n(
    "header",
    {
      imports: 'import { Header } from "@/components/native/header";',
      code: 'const scrollY = useRef(new Animated.Value(0)).current;\n\n<Header title="Notes" scrollY={scrollY} actions={[{ icon: "search", label: "Search" }]} />\n<Animated.ScrollView\n  onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}\n/>',
    },
    [
      {
        name: "Header",
        props: [
          ["title", "string", undefined, "Screen title."],
          ["eyebrow", "string", undefined, "Small text above the large title."],
          ["onBack", "() => void", undefined, "Shows a back button."],
          ["backLabel", "string", '"Back"', "Back button text."],
          ["actions", "{ icon, label, onPress?, badge? }[]", "[]", "Round buttons on the right."],
          ["scrollY", "Animated.Value", undefined, "Collapses the large title on scroll."],
          ["compact", "boolean", "false", "Only the compact bar."],
          STYLE,
        ],
      },
    ],
    {
      extra:
        "## With Expo Router\n\nSet `headerShown: false` on the screen and render `<Header />` yourself so it can react to scroll.",
    },
  ),
  n(
    "tab-bar",
    {
      imports: 'import { TabBar } from "@/components/native/tab-bar";',
      code: "<TabBar items={tabs} value={tab} onValueChange={setTab} />",
    },
    [
      {
        name: "TabBar",
        props: [
          ["items", "{ key, label, icon, badge? }[]", undefined, "Tabs."],
          ["value", "string", undefined, "Active key."],
          ["onValueChange", "(key: string) => void", undefined, "Called on press."],
          ["variant", '"floating" | "docked"', '"floating"', "Floating pill or edge-to-edge."],
          ["bottomInset", "number", "20", "Bottom spacing."],
          STYLE,
        ],
      },
    ],
    {
      extra:
        "## With Expo Router\n\n```tsx\n<Tabs\n  screenOptions={{ headerShown: false }}\n  tabBar={({ state, navigation }) => (\n    <TabBar\n      items={state.routes.map((r) => ({ key: r.name, label: r.name, icon: icons[r.name] }))}\n      value={state.routes[state.index].name}\n      onValueChange={(name) => navigation.navigate(name)}\n    />\n  )}\n/>\n```",
    },
  ),
  n(
    "swipeable-row",
    {
      imports: 'import { SwipeableRow } from "@/components/native/swipeable-row";',
      code: '<SwipeableRow rightActions={[{ label: "Delete", icon: "trash", onPress: remove }]}>\n  <ListItem title="Message" />\n</SwipeableRow>',
    },
    [
      {
        name: "SwipeableRow",
        props: [
          ["children", "ReactNode", undefined, "Row content."],
          ["rightActions", "{ label, icon, color?, onPress }[]", "[]", "Revealed swiping left."],
          ["leftActions", "{ label, icon, color?, onPress }[]", "[]", "Revealed swiping right."],
          ["actionWidth", "number", "76", "Width per action."],
          STYLE,
        ],
      },
    ],
    {
      a11y: {
        notes:
          "Actions are exposed as accessibility actions, so screen reader users can trigger them without swiping.",
      },
    },
  ),
];
