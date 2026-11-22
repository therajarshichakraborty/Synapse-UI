// @ts-nocheck
import { browser } from "fumadocs-mdx/runtime/browser";
import type * as Config from "../source.config";

const create = browser<
  typeof Config,
  import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
    DocData: {};
  }
>();
const browserCollections = {
  docs: create.doc("docs", {
    "changelog.mdx": () => import("../src/content/docs/changelog.mdx?collection=docs"),
    "cli.mdx": () => import("../src/content/docs/cli.mdx?collection=docs"),
    "dark-mode.mdx": () => import("../src/content/docs/dark-mode.mdx?collection=docs"),
    "index.mdx": () => import("../src/content/docs/index.mdx?collection=docs"),
    "installation.mdx": () => import("../src/content/docs/installation.mdx?collection=docs"),
    "theming.mdx": () => import("../src/content/docs/theming.mdx?collection=docs"),
    "blocks/cta-panel.mdx": () =>
      import("../src/content/docs/blocks/cta-panel.mdx?collection=docs"),
    "blocks/dashboard-shell.mdx": () =>
      import("../src/content/docs/blocks/dashboard-shell.mdx?collection=docs"),
    "blocks/faq-section.mdx": () =>
      import("../src/content/docs/blocks/faq-section.mdx?collection=docs"),
    "blocks/feature-grid.mdx": () =>
      import("../src/content/docs/blocks/feature-grid.mdx?collection=docs"),
    "blocks/hero-product.mdx": () =>
      import("../src/content/docs/blocks/hero-product.mdx?collection=docs"),
    "blocks/hero-split.mdx": () =>
      import("../src/content/docs/blocks/hero-split.mdx?collection=docs"),
    "blocks/hero-spotlight.mdx": () =>
      import("../src/content/docs/blocks/hero-spotlight.mdx?collection=docs"),
    "blocks/index.mdx": () => import("../src/content/docs/blocks/index.mdx?collection=docs"),
    "blocks/login-page.mdx": () =>
      import("../src/content/docs/blocks/login-page.mdx?collection=docs"),
    "blocks/pricing-table.mdx": () =>
      import("../src/content/docs/blocks/pricing-table.mdx?collection=docs"),
    "blocks/signup-page.mdx": () =>
      import("../src/content/docs/blocks/signup-page.mdx?collection=docs"),
    "blocks/site-footer.mdx": () =>
      import("../src/content/docs/blocks/site-footer.mdx?collection=docs"),
    "blocks/testimonial-wall.mdx": () =>
      import("../src/content/docs/blocks/testimonial-wall.mdx?collection=docs"),
    "animated/animated-tabs.mdx": () =>
      import("../src/content/docs/animated/animated-tabs.mdx?collection=docs"),
    "animated/animated-tooltip.mdx": () =>
      import("../src/content/docs/animated/animated-tooltip.mdx?collection=docs"),
    "animated/aurora-background.mdx": () =>
      import("../src/content/docs/animated/aurora-background.mdx?collection=docs"),
    "animated/background-beams.mdx": () =>
      import("../src/content/docs/animated/background-beams.mdx?collection=docs"),
    "animated/bento-grid.mdx": () =>
      import("../src/content/docs/animated/bento-grid.mdx?collection=docs"),
    "animated/card-spotlight.mdx": () =>
      import("../src/content/docs/animated/card-spotlight.mdx?collection=docs"),
    "animated/code-block.mdx": () =>
      import("../src/content/docs/animated/code-block.mdx?collection=docs"),
    "animated/dotted-world-map.mdx": () =>
      import("../src/content/docs/animated/dotted-world-map.mdx?collection=docs"),
    "animated/expandable-card.mdx": () =>
      import("../src/content/docs/animated/expandable-card.mdx?collection=docs"),
    "animated/flip-words.mdx": () =>
      import("../src/content/docs/animated/flip-words.mdx?collection=docs"),
    "animated/floating-dock.mdx": () =>
      import("../src/content/docs/animated/floating-dock.mdx?collection=docs"),
    "animated/floating-navbar.mdx": () =>
      import("../src/content/docs/animated/floating-navbar.mdx?collection=docs"),
    "animated/glowing-card.mdx": () =>
      import("../src/content/docs/animated/glowing-card.mdx?collection=docs"),
    "animated/gradient-text.mdx": () =>
      import("../src/content/docs/animated/gradient-text.mdx?collection=docs"),
    "animated/grid-background.mdx": () =>
      import("../src/content/docs/animated/grid-background.mdx?collection=docs"),
    "animated/index.mdx": () => import("../src/content/docs/animated/index.mdx?collection=docs"),
    "animated/infinite-moving-cards.mdx": () =>
      import("../src/content/docs/animated/infinite-moving-cards.mdx?collection=docs"),
    "animated/lamp-effect.mdx": () =>
      import("../src/content/docs/animated/lamp-effect.mdx?collection=docs"),
    "animated/marquee.mdx": () =>
      import("../src/content/docs/animated/marquee.mdx?collection=docs"),
    "animated/meteors.mdx": () =>
      import("../src/content/docs/animated/meteors.mdx?collection=docs"),
    "animated/moving-border-button.mdx": () =>
      import("../src/content/docs/animated/moving-border-button.mdx?collection=docs"),
    "animated/number-ticker.mdx": () =>
      import("../src/content/docs/animated/number-ticker.mdx?collection=docs"),
    "animated/parallax-scroll.mdx": () =>
      import("../src/content/docs/animated/parallax-scroll.mdx?collection=docs"),
    "animated/shimmer-button.mdx": () =>
      import("../src/content/docs/animated/shimmer-button.mdx?collection=docs"),
    "animated/sparkles.mdx": () =>
      import("../src/content/docs/animated/sparkles.mdx?collection=docs"),
    "animated/spotlight.mdx": () =>
      import("../src/content/docs/animated/spotlight.mdx?collection=docs"),
    "animated/terminal.mdx": () =>
      import("../src/content/docs/animated/terminal.mdx?collection=docs"),
    "animated/text-generate-effect.mdx": () =>
      import("../src/content/docs/animated/text-generate-effect.mdx?collection=docs"),
    "animated/tilt-card.mdx": () =>
      import("../src/content/docs/animated/tilt-card.mdx?collection=docs"),
    "animated/timeline.mdx": () =>
      import("../src/content/docs/animated/timeline.mdx?collection=docs"),
    "animated/tracing-beam.mdx": () =>
      import("../src/content/docs/animated/tracing-beam.mdx?collection=docs"),
    "animated/typewriter.mdx": () =>
      import("../src/content/docs/animated/typewriter.mdx?collection=docs"),
    "collections/ai-input.mdx": () =>
      import("../src/content/docs/collections/ai-input.mdx?collection=docs"),
    "collections/alert.mdx": () =>
      import("../src/content/docs/collections/alert.mdx?collection=docs"),
    "collections/badge.mdx": () =>
      import("../src/content/docs/collections/badge.mdx?collection=docs"),
    "collections/block.mdx": () =>
      import("../src/content/docs/collections/block.mdx?collection=docs"),
    "collections/button.mdx": () =>
      import("../src/content/docs/collections/button.mdx?collection=docs"),
    "collections/card.mdx": () =>
      import("../src/content/docs/collections/card.mdx?collection=docs"),
    "collections/faq.mdx": () => import("../src/content/docs/collections/faq.mdx?collection=docs"),
    "collections/hooks.mdx": () =>
      import("../src/content/docs/collections/hooks.mdx?collection=docs"),
    "collections/input.mdx": () =>
      import("../src/content/docs/collections/input.mdx?collection=docs"),
    "collections/list.mdx": () =>
      import("../src/content/docs/collections/list.mdx?collection=docs"),
    "collections/message.mdx": () =>
      import("../src/content/docs/collections/message.mdx?collection=docs"),
    "collections/popover.mdx": () =>
      import("../src/content/docs/collections/popover.mdx?collection=docs"),
    "collections/pricing.mdx": () =>
      import("../src/content/docs/collections/pricing.mdx?collection=docs"),
    "collections/text.mdx": () =>
      import("../src/content/docs/collections/text.mdx?collection=docs"),
    "collections/tooltip.mdx": () =>
      import("../src/content/docs/collections/tooltip.mdx?collection=docs"),
    "components/accordion.mdx": () =>
      import("../src/content/docs/components/accordion.mdx?collection=docs"),
    "components/alert-dialog.mdx": () =>
      import("../src/content/docs/components/alert-dialog.mdx?collection=docs"),
    "components/alert.mdx": () =>
      import("../src/content/docs/components/alert.mdx?collection=docs"),
    "components/aspect-ratio.mdx": () =>
      import("../src/content/docs/components/aspect-ratio.mdx?collection=docs"),
    "components/avatar.mdx": () =>
      import("../src/content/docs/components/avatar.mdx?collection=docs"),
    "components/badge.mdx": () =>
      import("../src/content/docs/components/badge.mdx?collection=docs"),
    "components/breadcrumb.mdx": () =>
      import("../src/content/docs/components/breadcrumb.mdx?collection=docs"),
    "components/button-group.mdx": () =>
      import("../src/content/docs/components/button-group.mdx?collection=docs"),
    "components/button.mdx": () =>
      import("../src/content/docs/components/button.mdx?collection=docs"),
    "components/calendar.mdx": () =>
      import("../src/content/docs/components/calendar.mdx?collection=docs"),
    "components/card.mdx": () => import("../src/content/docs/components/card.mdx?collection=docs"),
    "components/carousel.mdx": () =>
      import("../src/content/docs/components/carousel.mdx?collection=docs"),
    "components/chart.mdx": () =>
      import("../src/content/docs/components/chart.mdx?collection=docs"),
    "components/checkbox.mdx": () =>
      import("../src/content/docs/components/checkbox.mdx?collection=docs"),
    "components/collapsible.mdx": () =>
      import("../src/content/docs/components/collapsible.mdx?collection=docs"),
    "components/combobox.mdx": () =>
      import("../src/content/docs/components/combobox.mdx?collection=docs"),
    "components/command.mdx": () =>
      import("../src/content/docs/components/command.mdx?collection=docs"),
    "components/context-menu.mdx": () =>
      import("../src/content/docs/components/context-menu.mdx?collection=docs"),
    "components/data-table.mdx": () =>
      import("../src/content/docs/components/data-table.mdx?collection=docs"),
    "components/date-picker.mdx": () =>
      import("../src/content/docs/components/date-picker.mdx?collection=docs"),
    "components/dialog.mdx": () =>
      import("../src/content/docs/components/dialog.mdx?collection=docs"),
    "components/drawer.mdx": () =>
      import("../src/content/docs/components/drawer.mdx?collection=docs"),
    "components/dropdown-menu.mdx": () =>
      import("../src/content/docs/components/dropdown-menu.mdx?collection=docs"),
    "components/empty-state.mdx": () =>
      import("../src/content/docs/components/empty-state.mdx?collection=docs"),
    "components/form.mdx": () => import("../src/content/docs/components/form.mdx?collection=docs"),
    "components/hover-card.mdx": () =>
      import("../src/content/docs/components/hover-card.mdx?collection=docs"),
    "components/index.mdx": () =>
      import("../src/content/docs/components/index.mdx?collection=docs"),
    "components/input-otp.mdx": () =>
      import("../src/content/docs/components/input-otp.mdx?collection=docs"),
    "components/input.mdx": () =>
      import("../src/content/docs/components/input.mdx?collection=docs"),
    "components/kbd.mdx": () => import("../src/content/docs/components/kbd.mdx?collection=docs"),
    "components/label.mdx": () =>
      import("../src/content/docs/components/label.mdx?collection=docs"),
    "components/menubar.mdx": () =>
      import("../src/content/docs/components/menubar.mdx?collection=docs"),
    "components/navigation-menu.mdx": () =>
      import("../src/content/docs/components/navigation-menu.mdx?collection=docs"),
    "components/pagination.mdx": () =>
      import("../src/content/docs/components/pagination.mdx?collection=docs"),
    "components/popover.mdx": () =>
      import("../src/content/docs/components/popover.mdx?collection=docs"),
    "components/progress.mdx": () =>
      import("../src/content/docs/components/progress.mdx?collection=docs"),
    "components/radio-group.mdx": () =>
      import("../src/content/docs/components/radio-group.mdx?collection=docs"),
    "components/resizable.mdx": () =>
      import("../src/content/docs/components/resizable.mdx?collection=docs"),
    "components/scroll-area.mdx": () =>
      import("../src/content/docs/components/scroll-area.mdx?collection=docs"),
    "components/select.mdx": () =>
      import("../src/content/docs/components/select.mdx?collection=docs"),
    "components/separator.mdx": () =>
      import("../src/content/docs/components/separator.mdx?collection=docs"),
    "components/sheet.mdx": () =>
      import("../src/content/docs/components/sheet.mdx?collection=docs"),
    "components/sidebar.mdx": () =>
      import("../src/content/docs/components/sidebar.mdx?collection=docs"),
    "components/skeleton.mdx": () =>
      import("../src/content/docs/components/skeleton.mdx?collection=docs"),
    "components/slider.mdx": () =>
      import("../src/content/docs/components/slider.mdx?collection=docs"),
    "components/sonner.mdx": () =>
      import("../src/content/docs/components/sonner.mdx?collection=docs"),
    "components/spinner.mdx": () =>
      import("../src/content/docs/components/spinner.mdx?collection=docs"),
    "components/switch.mdx": () =>
      import("../src/content/docs/components/switch.mdx?collection=docs"),
    "components/table.mdx": () =>
      import("../src/content/docs/components/table.mdx?collection=docs"),
    "components/tabs.mdx": () => import("../src/content/docs/components/tabs.mdx?collection=docs"),
    "components/textarea.mdx": () =>
      import("../src/content/docs/components/textarea.mdx?collection=docs"),
    "components/toggle-group.mdx": () =>
      import("../src/content/docs/components/toggle-group.mdx?collection=docs"),
    "components/toggle.mdx": () =>
      import("../src/content/docs/components/toggle.mdx?collection=docs"),
    "components/tooltip.mdx": () =>
      import("../src/content/docs/components/tooltip.mdx?collection=docs"),
  }),
};
export default browserCollections;
