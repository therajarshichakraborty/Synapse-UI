/**
 * Synapse UI Native: React Native / Expo components.
 * Registered as `native-<slug>` and documented at /docs/react-native/<slug>.
 */
import type { RegistryEntry } from "./registry";

const nat = (
  slug: string,
  title: string,
  description: string,
  extra: Partial<RegistryEntry> = {},
): RegistryEntry => ({
  name: `native-${slug}`,
  title,
  description,
  category: "native",
  files: [`src/components/native/${slug}.tsx`],
  ...extra,
});

export const nativeComponents: RegistryEntry[] = [
  // Foundations
  nat("text", "Text", "Typography with display, heading, body, muted, overline and code variants."),
  nat("icon", "Icon", "90+ crisp Lucide icons drawn with react-native-svg, themed by default."),

  // Actions
  nat(
    "button",
    "Button",
    "Spring-press buttons with seven variants, icons, loading and icon-only buttons.",
  ),
  nat(
    "toggle",
    "Toggle",
    "An icon toggle with a satisfying pop, for likes, bookmarks and follows.",
  ),
  nat(
    "fab",
    "Floating Action Button",
    "A floating action button that expands into a speed-dial menu.",
    { isNew: true },
  ),
  nat(
    "segmented-control",
    "Segmented Control",
    "An iOS-style segmented control with a sliding thumb.",
  ),

  // Forms
  nat("input", "Input", "A text field with floating focus ring, icons, clear and password reveal."),
  nat("textarea", "Textarea", "A multi-line text field with a live character counter."),
  nat("form-field", "Form Field", "Label, description and error message wired around any control."),
  nat("search-bar", "Search Bar", "A pill search field with an animated cancel button."),
  nat(
    "otp-input",
    "OTP Input",
    "One-time-code input with per-digit cells, caret and paste support.",
    { isNew: true },
  ),
  nat(
    "chat-input",
    "Chat Input",
    "An AI chat composer with attachments, auto-grow and send button.",
    { isNew: true },
  ),
  nat(
    "checkbox",
    "Checkbox",
    "An animated checkbox with label, description and indeterminate state.",
  ),
  nat("radio-group", "Radio Group", "A set of radio options in list or card layouts."),
  nat("switch", "Switch", "An iOS-grade toggle switch with a springy thumb."),
  nat("slider", "Slider", "A draggable range slider with steps and a value bubble."),
  nat("stepper", "Stepper", "A numeric stepper with press-and-hold to repeat."),
  nat("select", "Select", "A select field that opens a searchable bottom-sheet picker."),
  nat("chip", "Chip", "Filter and choice chips with single or multi selection."),
  nat("rating", "Rating", "Tap-to-rate stars with half-step display."),
  nat("keypad", "Keypad", "A PIN pad with dots, haptic-style press and delete.", { isNew: true }),

  // Display
  nat("card", "Card", "A surface with header, content and footer slots, in four styles."),
  nat("avatar", "Avatar", "Avatars with image, initials fallback, status dot and stacked groups."),
  nat("badge", "Badge", "Small status labels in solid, soft and outline tones."),
  nat("separator", "Separator", "A hairline divider, optionally with a centered label."),
  nat("skeleton", "Skeleton", "Shimmering placeholders for loading content."),
  nat("progress", "Progress", "An animated linear progress bar with label and value."),
  nat("progress-ring", "Progress Ring", "A circular progress ring with a centered label."),
  nat("spinner", "Spinner", "A smooth arc spinner in three sizes."),
  nat("alert", "Alert", "Inline callouts for info, success, warning and errors."),
  nat("banner", "Banner", "A dismissible announcement banner with an action."),
  nat("empty-state", "Empty State", "A friendly placeholder for empty lists and first runs."),
  nat("list", "List", "Grouped, inset settings-style lists with icons, values and switches."),
  nat("accordion", "Accordion", "Expandable sections with a rotating chevron and smooth height."),
  nat("tabs", "Tabs", "Underline and pill tabs with an animated indicator."),
  nat("stat-card", "Stat Card", "A KPI card with trend, delta and sparkline."),
  nat("timeline", "Timeline", "A vertical activity timeline with status dots."),
  nat("steps", "Steps", "A horizontal progress indicator for multi-step flows."),
  nat("carousel", "Carousel", "A snapping, paged carousel with animated page indicator."),
  nat(
    "page-indicator",
    "Page Indicator",
    "Animated pagination dots that stretch for the active page.",
  ),
  nat("media-card", "Media Card", "An image card with gradient scrim, title and actions."),
  nat("plan-card", "Plan Card", "Selectable subscription plans with highlight and badge.", {
    isNew: true,
  }),
  nat("chat-bubble", "Chat Bubble", "Message bubbles with tails, timestamps and read receipts."),
  nat("typing-indicator", "Typing Indicator", "Three bouncing dots that show someone is typing."),
  nat("number-ticker", "Number Ticker", "Animated counting numbers with formatting."),
  nat("calendar-strip", "Calendar Strip", "A horizontal week strip for picking a day."),
  nat("bar-chart", "Bar Chart", "A lightweight animated bar chart, no chart library needed."),
  nat("sparkline", "Sparkline", "A tiny smooth trend line with gradient fill."),

  // Overlays
  nat("dialog", "Dialog", "A centered modal with a spring entrance and backdrop."),
  nat(
    "alert-dialog",
    "Alert Dialog",
    "A confirmation dialog for destructive or important actions.",
  ),
  nat("bottom-sheet", "Bottom Sheet", "A draggable bottom sheet with snap points and handle.", {
    isNew: true,
  }),
  nat("action-sheet", "Action Sheet", "An iOS-style action sheet with grouped options and cancel."),
  nat(
    "dropdown-menu",
    "Dropdown Menu",
    "An anchored menu with icons, shortcuts and destructive items.",
  ),
  nat("tooltip", "Tooltip", "Long-press tooltips that position above their trigger."),
  nat("drawer", "Drawer", "A side drawer for navigation with swipe-to-close."),
  nat("toast", "Toast", "Imperative, stackable toasts with promise and action support."),

  // Navigation
  nat("header", "Header", "A large-title app header that collapses as you scroll."),
  nat("tab-bar", "Tab Bar", "A floating bottom tab bar with a sliding active pill.", {
    isNew: true,
  }),
  nat("swipeable-row", "Swipeable Row", "List rows that reveal actions when swiped."),
];
