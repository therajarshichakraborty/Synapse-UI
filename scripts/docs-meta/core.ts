import type { DocMeta, PropTuple } from "./types";

const cls: PropTuple = ["className", "string", undefined, "Additional classes merged with cn()."];
const asChild: PropTuple = [
  "asChild",
  "boolean",
  "false",
  "Render the child element instead, merging props and behavior.",
];
const imp = (names: string, file: string) => `import { ${names} } from "@/components/ui/${file}";`;

const menuKeys: [string, string][] = [
  ["Space", "Opens the menu, or activates the focused item."],
  ["Enter", "Opens the menu, or activates the focused item."],
  ["ArrowDown", "Moves focus to the next item."],
  ["ArrowUp", "Moves focus to the previous item."],
  ["ArrowRight", "Opens a submenu when focus is on a sub trigger."],
  ["ArrowLeft", "Closes the current submenu."],
  ["Esc", "Closes the menu and returns focus to the trigger."],
];

const dialogKeys: [string, string][] = [
  ["Space", "Opens or closes the dialog from the trigger."],
  ["Enter", "Opens or closes the dialog from the trigger."],
  ["Tab", "Moves focus to the next focusable element. Focus is trapped inside."],
  ["Shift + Tab", "Moves focus to the previous focusable element."],
  ["Esc", "Closes the dialog and returns focus to the trigger."],
];

const content = (name: string): { name: string; props: PropTuple[] } => ({
  name,
  props: [
    [
      "side",
      '"top" | "right" | "bottom" | "left"',
      '"bottom"',
      "Preferred side of the trigger to render against.",
    ],
    ["align", '"start" | "center" | "end"', '"center"', "Preferred alignment against the trigger."],
    ["sideOffset", "number", "4", "Distance in pixels from the trigger."],
    cls,
  ],
});

export const coreDocs: DocMeta[] = [
  {
    name: "accordion",
    usage: {
      imports: imp("Accordion, AccordionContent, AccordionItem, AccordionTrigger", "accordion"),
      code: `<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
  </AccordionItem>
</Accordion>`,
    },
    examples: [
      {
        name: "accordion-multiple",
        title: "Multiple",
        description: "Allow several items to be open at the same time.",
      },
    ],
    api: [
      {
        name: "Accordion",
        props: [
          ["type", '"single" | "multiple"', undefined, "Whether one or many items can be open."],
          [
            "collapsible",
            "boolean",
            "false",
            'When type is "single", allows closing the open item.',
          ],
          [
            "value / defaultValue",
            "string | string[]",
            undefined,
            "Controlled or initial open item(s).",
          ],
          ["onValueChange", "(value) => void", undefined, "Called when open items change."],
          ["disabled", "boolean", "false", "Disables every item."],
          cls,
        ],
      },
      {
        name: "AccordionItem",
        props: [
          ["value", "string", undefined, "Unique value for the item."],
          ["disabled", "boolean", "false", "Disables the item."],
          cls,
        ],
      },
      { name: "AccordionTrigger / AccordionContent", props: [cls] },
    ],
    a11y: {
      notes:
        "Built on Radix Accordion. Triggers are buttons with `aria-expanded` and `aria-controls`, and content regions are labelled by their trigger.",
      keys: [
        ["Space", "Toggles the focused section."],
        ["Enter", "Toggles the focused section."],
        ["Tab", "Moves focus to the next focusable element."],
        ["ArrowDown", "Moves focus to the next trigger."],
        ["ArrowUp", "Moves focus to the previous trigger."],
        ["Home", "Moves focus to the first trigger."],
        ["End", "Moves focus to the last trigger."],
      ],
    },
  },
  {
    name: "alert",
    usage: {
      imports: imp("Alert, AlertDescription, AlertTitle", "alert"),
      code: `<Alert variant="info">
  <InfoIcon />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>You can add components using the CLI.</AlertDescription>
</Alert>`,
    },
    examples: [
      {
        name: "alert-variants",
        title: "Variants",
        description: "Use `info`, `success`, `warning` and `destructive` for status messages.",
      },
    ],
    api: [
      {
        name: "Alert",
        props: [
          [
            "variant",
            '"default" | "info" | "success" | "warning" | "destructive"',
            '"default"',
            "Visual style.",
          ],
          cls,
        ],
      },
      { name: "AlertTitle / AlertDescription / AlertAction", props: [cls] },
    ],
    a11y: {
      notes:
        'Alert renders with `role="alert"`. Screen readers announce it when it appears. For dismissible or non-urgent messages, consider a toast instead.',
    },
  },
  {
    name: "alert-dialog",
    usage: {
      imports: imp(
        "AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger",
        "alert-dialog",
      ),
      code: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
    },
    examples: [
      {
        name: "alert-dialog-destructive",
        title: "Destructive",
        description: "Pair a media slot with a destructive action for irreversible operations.",
      },
    ],
    api: [
      {
        name: "AlertDialog",
        props: [
          ["open / defaultOpen", "boolean", undefined, "Controlled or initial open state."],
          [
            "onOpenChange",
            "(open: boolean) => void",
            undefined,
            "Called when the open state changes.",
          ],
        ],
      },
      {
        name: "AlertDialogContent",
        props: [["size", '"default" | "sm"', '"default"', "Width and footer layout."], cls],
      },
      { name: "AlertDialogAction / AlertDialogCancel", props: [asChild, cls] },
    ],
    a11y: {
      notes:
        "Focus moves to the Cancel button on open and is trapped inside the dialog. Clicking outside does not close it, so the user must respond.",
      keys: dialogKeys,
    },
  },
  {
    name: "aspect-ratio",
    usage: {
      imports: imp("AspectRatio", "aspect-ratio"),
      code: `<AspectRatio ratio={16 / 9}>
  <Image src="..." alt="Photo" fill className="rounded-lg object-cover" />
</AspectRatio>`,
    },
    api: [
      {
        name: "AspectRatio",
        props: [["ratio", "number", "1", "The desired width / height ratio."], cls],
      },
    ],
  },
  {
    name: "avatar",
    usage: {
      imports: imp("Avatar, AvatarFallback, AvatarImage", "avatar"),
      code: `<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`,
    },
    examples: [
      {
        name: "avatar-group",
        title: "Group",
        description: "Stack avatars with `AvatarGroup` and show overflow with `AvatarGroupCount`.",
      },
    ],
    api: [
      {
        name: "Avatar",
        props: [["size", '"sm" | "default" | "lg"', '"default"', "Avatar size."], cls],
      },
      {
        name: "AvatarImage",
        props: [
          ["src", "string", undefined, "Image URL."],
          ["alt", "string", undefined, "Accessible description."],
          cls,
        ],
      },
      {
        name: "AvatarFallback",
        props: [
          ["delayMs", "number", undefined, "Delay before showing the fallback, to avoid flashing."],
          cls,
        ],
      },
      { name: "AvatarBadge / AvatarGroup / AvatarGroupCount", props: [cls] },
    ],
  },
  {
    name: "badge",
    usage: { imports: imp("Badge", "badge"), code: `<Badge variant="success">Ready</Badge>` },
    examples: [
      {
        name: "badge-status",
        title: "Status and icons",
        description: "Add an icon with `data-icon` to adjust padding.",
      },
    ],
    api: [
      {
        name: "Badge",
        props: [
          [
            "variant",
            '"default" | "secondary" | "outline" | "destructive" | "success" | "warning" | "info" | "gradient" | "ghost" | "link"',
            '"default"',
            "Visual style.",
          ],
          asChild,
          cls,
        ],
      },
    ],
  },
  {
    name: "breadcrumb",
    usage: {
      imports: imp(
        "Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator",
        "breadcrumb",
      ),
      code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    },
    api: [
      {
        name: "BreadcrumbLink",
        props: [asChild, ["href", "string", undefined, "Link target."], cls],
      },
      {
        name: "BreadcrumbPage",
        description: 'Renders the current page with `aria-current="page"`.',
        props: [cls],
      },
      {
        name: "BreadcrumbSeparator",
        props: [["children", "ReactNode", "<ChevronRight />", "Custom separator."], cls],
      },
    ],
    a11y: {
      notes:
        'Renders a `nav` with `aria-label="breadcrumb"`. Separators are hidden from assistive technology.',
    },
  },
  {
    name: "button",
    usage: { imports: imp("Button", "button"), code: `<Button variant="outline">Button</Button>` },
    examples: [
      { name: "button-variants", title: "Variants" },
      {
        name: "button-sizes",
        title: "Sizes",
        description: "Text sizes from `xs` to `lg`, plus square icon sizes.",
      },
      {
        name: "button-loading",
        title: "Loading",
        description: "Combine with Spinner and `aria-busy` while an action is pending.",
      },
      {
        name: "button-as-child",
        title: "As child",
        description: "Use `asChild` to render a link with button styles.",
      },
    ],
    api: [
      {
        name: "Button",
        props: [
          [
            "variant",
            '"default" | "gradient" | "secondary" | "outline" | "glass" | "ghost" | "destructive" | "link"',
            '"default"',
            "Visual style.",
          ],
          [
            "size",
            '"xs" | "sm" | "default" | "lg" | "icon-xs" | "icon-sm" | "icon" | "icon-lg"',
            '"default"',
            "Height, padding and icon size.",
          ],
          asChild,
          cls,
        ],
      },
    ],
    a11y: {
      notes:
        "Renders a native `button`. Icon-only buttons need an `aria-label`. When disabled, the button is removed from the tab order.",
      keys: [
        ["Space", "Activates the button."],
        ["Enter", "Activates the button."],
      ],
    },
    extra:
      "## More designs\n\nFor animated buttons, see [Shimmer Button](/docs/animated/shimmer-button) and [Moving Border Button](/docs/animated/moving-border-button). Building for mobile? See the [React Native Button](/docs/react-native/button).",
  },
  {
    name: "button-group",
    usage: {
      imports: imp("ButtonGroup", "button-group"),
      code: `<ButtonGroup>
  <Button variant="outline">Left</Button>
  <Button variant="outline">Right</Button>
</ButtonGroup>`,
    },
    examples: [
      {
        name: "button-group-orientation",
        title: "Orientation and text",
        description: "Stack vertically, or mix in static text with `ButtonGroupText`.",
      },
    ],
    api: [
      {
        name: "ButtonGroup",
        props: [
          ["orientation", '"horizontal" | "vertical"', '"horizontal"', "Layout direction."],
          cls,
        ],
      },
      { name: "ButtonGroupText / ButtonGroupSeparator", props: [asChild, cls] },
    ],
    a11y: {
      notes:
        'Renders with `role="group"`. Provide an `aria-label` when the purpose of the group is not obvious.',
    },
  },
  {
    name: "calendar",
    usage: {
      imports: imp("Calendar", "calendar"),
      code: `const [date, setDate] = React.useState<Date | undefined>(new Date());

<Calendar mode="single" selected={date} onSelect={setDate} className="rounded-xl border" />`,
    },
    examples: [
      { name: "calendar-range", title: "Range", description: "Select a range across two months." },
    ],
    api: [
      {
        name: "Calendar",
        description: "Accepts every [React DayPicker](https://daypicker.dev) prop.",
        props: [
          ["mode", '"single" | "multiple" | "range"', undefined, "Selection mode."],
          ["selected", "Date | Date[] | DateRange", undefined, "Selected value."],
          ["onSelect", "(value) => void", undefined, "Called when the selection changes."],
          ["numberOfMonths", "number", "1", "Months to display."],
          ["captionLayout", '"label" | "dropdown"', '"label"', "Show month and year dropdowns."],
          cls,
        ],
      },
    ],
    a11y: {
      keys: [
        ["ArrowLeft / ArrowRight", "Moves focus one day."],
        ["ArrowUp / ArrowDown", "Moves focus one week."],
        ["PageUp / PageDown", "Moves focus one month."],
        ["Home / End", "Moves focus to the start or end of the week."],
        ["Enter / Space", "Selects the focused day."],
      ],
    },
  },
  {
    name: "card",
    usage: {
      imports: imp(
        "Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle",
        "card",
      ),
      code: `<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
    <CardAction>Action</CardAction>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>`,
    },
    examples: [
      {
        name: "card-stats",
        title: "Stats",
        description: "Use `CardAction` for a badge or button aligned to the header.",
      },
    ],
    api: [
      { name: "Card", props: [["size", '"default" | "sm"', '"default"', "Padding density."], cls] },
      {
        name: "CardHeader / CardTitle / CardDescription / CardAction / CardContent / CardFooter",
        props: [cls],
      },
    ],
    extra:
      "## More designs\n\nSee [Glowing Border Card](/docs/animated/glowing-card), [Card Spotlight](/docs/animated/card-spotlight) and [3D Tilt Card](/docs/animated/tilt-card).",
  },
  {
    name: "carousel",
    usage: {
      imports: imp(
        "Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious",
        "carousel",
      ),
      code: `<Carousel>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
    },
    examples: [
      {
        name: "carousel-multiple",
        title: "Multiple per view",
        description: "Set `basis-*` on items to show several at once.",
      },
    ],
    api: [
      {
        name: "Carousel",
        props: [
          ["opts", "EmblaOptionsType", undefined, "Embla options such as align and loop."],
          ["plugins", "EmblaPluginType[]", undefined, "Embla plugins, for example autoplay."],
          ["orientation", '"horizontal" | "vertical"', '"horizontal"', "Scroll direction."],
          ["setApi", "(api: CarouselApi) => void", undefined, "Receive the Embla API instance."],
          cls,
        ],
      },
      { name: "CarouselContent / CarouselItem / CarouselPrevious / CarouselNext", props: [cls] },
    ],
    a11y: {
      notes:
        'The region has `aria-roledescription="carousel"` and each slide has `aria-roledescription="slide"`.',
      keys: [
        ["ArrowLeft", "Scrolls to the previous slide."],
        ["ArrowRight", "Scrolls to the next slide."],
      ],
    },
  },
  {
    name: "chart",
    usage: {
      imports: `import { Bar, BarChart } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";`,
      code: `const config = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
} satisfies ChartConfig;

<ChartContainer config={config} className="min-h-[200px] w-full">
  <BarChart data={data}>
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={6} />
  </BarChart>
</ChartContainer>`,
    },
    examples: [
      { name: "chart-area", title: "Area chart", description: "Gradient fills with a legend." },
    ],
    api: [
      {
        name: "ChartContainer",
        props: [
          [
            "config",
            "ChartConfig",
            undefined,
            "Maps data keys to labels, icons and colors. Exposed as --color-[key].",
          ],
          cls,
        ],
      },
      {
        name: "ChartTooltipContent",
        props: [
          ["indicator", '"dot" | "line" | "dashed"', '"dot"', "Indicator style."],
          ["hideLabel", "boolean", "false", "Hide the tooltip label."],
          [
            "nameKey / labelKey",
            "string",
            undefined,
            "Override which keys are used for names and labels.",
          ],
        ],
      },
    ],
    a11y: {
      notes:
        "Pass `accessibilityLayer` to Recharts charts to enable keyboard navigation and screen-reader descriptions.",
    },
  },
  {
    name: "checkbox",
    usage: {
      imports: imp("Checkbox", "checkbox"),
      code: `<Checkbox id="terms" />\n<Label htmlFor="terms">Accept terms</Label>`,
    },
    examples: [
      {
        name: "checkbox-card",
        title: "Card",
        description: "Wrap the checkbox in a label to make the whole card clickable.",
      },
    ],
    api: [
      {
        name: "Checkbox",
        props: [
          [
            "checked / defaultChecked",
            'boolean | "indeterminate"',
            undefined,
            "Controlled or initial state.",
          ],
          ["onCheckedChange", "(checked) => void", undefined, "Called when the state changes."],
          ["disabled", "boolean", "false", "Prevents interaction."],
          ["required", "boolean", "false", "Marks the checkbox as required in a form."],
          cls,
        ],
      },
    ],
    a11y: { keys: [["Space", "Toggles the checkbox."]] },
  },
  {
    name: "collapsible",
    usage: {
      imports: imp("Collapsible, CollapsibleContent, CollapsibleTrigger", "collapsible"),
      code: `<Collapsible>
  <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
  <CollapsibleContent>Yes. Free to use for personal and commercial projects.</CollapsibleContent>
</Collapsible>`,
    },
    api: [
      {
        name: "Collapsible",
        props: [
          ["open / defaultOpen", "boolean", undefined, "Controlled or initial state."],
          ["onOpenChange", "(open: boolean) => void", undefined, "Called on toggle."],
          ["disabled", "boolean", "false", "Prevents toggling."],
        ],
      },
      { name: "CollapsibleTrigger / CollapsibleContent", props: [asChild, cls] },
    ],
    a11y: {
      keys: [
        ["Space", "Toggles the panel."],
        ["Enter", "Toggles the panel."],
      ],
    },
  },
  {
    name: "combobox",
    usage: {
      imports: imp(
        "Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList",
        "combobox",
      ),
      code: `<Combobox items={frameworks}>
  <ComboboxInput placeholder="Select a framework" />
  <ComboboxContent>
    <ComboboxEmpty>No framework found.</ComboboxEmpty>
    <ComboboxList>
      {(item) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`,
    },
    api: [
      {
        name: "Combobox",
        description: "Built on the Base UI Combobox root.",
        props: [
          ["items", "T[]", undefined, "Items to filter and render."],
          ["value / defaultValue", "T | T[]", undefined, "Selected value(s)."],
          ["onValueChange", "(value) => void", undefined, "Called when the selection changes."],
          ["multiple", "boolean", "false", "Allow multiple selection (use with ComboboxChips)."],
        ],
      },
      {
        name: "ComboboxInput",
        props: [
          ["showTrigger", "boolean", "true", "Show the chevron trigger."],
          ["showClear", "boolean", "false", "Show a clear button."],
          cls,
        ],
      },
    ],
    a11y: {
      keys: [
        ["ArrowDown / ArrowUp", "Opens the list and moves the highlighted item."],
        ["Enter", "Selects the highlighted item."],
        ["Esc", "Closes the list."],
      ],
    },
  },
  {
    name: "command",
    usage: {
      imports: imp(
        "Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList",
        "command",
      ),
      code: `<Command>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`,
    },
    examples: [
      {
        name: "command-dialog",
        title: "Dialog",
        description:
          "Open a palette in a dialog with a keyboard shortcut. The docs search on this site uses this pattern.",
      },
    ],
    api: [
      {
        name: "Command",
        props: [
          ["filter", "(value, search) => number", undefined, "Custom ranking function."],
          ["shouldFilter", "boolean", "true", "Disable to filter items yourself."],
          cls,
        ],
      },
      {
        name: "CommandDialog",
        props: [
          ["open / onOpenChange", "boolean / (open) => void", undefined, "Dialog state."],
          [
            "title / description",
            "string",
            undefined,
            "Accessible dialog labels (visually hidden).",
          ],
        ],
      },
      {
        name: "CommandItem",
        props: [
          ["value", "string", undefined, "Value used for filtering."],
          ["onSelect", "(value: string) => void", undefined, "Called on click or Enter."],
          ["disabled", "boolean", "false", "Prevents selection."],
        ],
      },
    ],
    a11y: {
      keys: [
        ["ArrowDown / ArrowUp", "Moves the active item."],
        ["Enter", "Selects the active item."],
        ["Esc", "Closes the dialog."],
      ],
    },
  },
  {
    name: "context-menu",
    usage: {
      imports: imp(
        "ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger",
        "context-menu",
      ),
      code: `<ContextMenu>
  <ContextMenuTrigger>Right click</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Profile</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`,
    },
    api: [
      {
        name: "ContextMenuItem",
        props: [
          ["inset", "boolean", "false", "Indent to align with items that have icons."],
          ["variant", '"default" | "destructive"', '"default"', "Visual style."],
          ["disabled", "boolean", "false", "Prevents selection."],
        ],
      },
      {
        name: "ContextMenuCheckboxItem / ContextMenuRadioItem",
        props: [
          ["checked", "boolean", undefined, "Checked state."],
          ["onCheckedChange", "(checked) => void", undefined, "Called on toggle."],
        ],
      },
    ],
    a11y: {
      notes:
        "Opens on right click or long press. On keyboard, focus the trigger and press Shift + F10.",
      keys: menuKeys,
    },
  },
  {
    name: "data-table",
    intro:
      "A batteries-included wrapper around [TanStack Table](https://tanstack.com/table) with sorting, filtering, pagination, row selection and column visibility. For full control, compose `Table` with `useReactTable` directly.",
    usage: {
      imports: `import type { ColumnDef } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader } from "@/components/ui/data-table";`,
      code: `const columns: ColumnDef<Payment>[] = [
  { accessorKey: "status", header: "Status" },
  { accessorKey: "email", header: ({ column }) => <DataTableColumnHeader column={column} title="Email" /> },
];

<DataTable columns={columns} data={payments} filterColumn="email" />`,
    },
    api: [
      {
        name: "DataTable",
        props: [
          ["columns", "ColumnDef<TData, TValue>[]", undefined, "Column definitions."],
          ["data", "TData[]", undefined, "Row data."],
          [
            "filterColumn",
            "string",
            undefined,
            "Column id filtered by the search input. Omit to hide search.",
          ],
          [
            "filterPlaceholder",
            "string",
            '"Filter..."',
            "Search placeholder and accessible label.",
          ],
          ["pageSize", "number", "10", "Rows per page."],
          ["enableColumnToggle", "boolean", "true", "Show the column visibility menu."],
          ["emptyMessage", "ReactNode", '"No results."', "Shown when no rows match."],
          [
            "onRowSelectionChange",
            "(rows: TData[]) => void",
            undefined,
            "Called with the selected rows.",
          ],
          cls,
        ],
      },
      {
        name: "DataTableColumnHeader",
        props: [
          ["column", "Column<TData, TValue>", undefined, "The TanStack column."],
          ["title", "string", undefined, "Header label."],
          cls,
        ],
      },
    ],
  },
  {
    name: "date-picker",
    usage: {
      imports: imp("DatePicker, DateRangePicker", "date-picker"),
      code: `const [date, setDate] = React.useState<Date>();

<DatePicker value={date} onValueChange={setDate} />`,
    },
    examples: [
      { name: "date-picker-range", title: "Range" },
      {
        name: "date-picker-form",
        title: "With label",
        description: "Pass an `id` so a Label can point at the trigger.",
      },
    ],
    api: [
      {
        name: "DatePicker",
        props: [
          ["value / defaultValue", "Date", undefined, "Controlled or initial date."],
          ["onValueChange", "(date?: Date) => void", undefined, "Called when a date is picked."],
          ["placeholder", "string", '"Pick a date"', "Shown when empty."],
          ["displayFormat", "string", '"PPP"', "date-fns format string."],
          ["disabled", "boolean", "false", "Disables the trigger."],
          cls,
        ],
      },
      {
        name: "DateRangePicker",
        props: [
          ["value / defaultValue", "DateRange", undefined, "Selected range."],
          ["onValueChange", "(range?: DateRange) => void", undefined, "Called on change."],
          ["numberOfMonths", "number", "2", "Months shown."],
          cls,
        ],
      },
    ],
  },
  {
    name: "dialog",
    usage: {
      imports: imp(
        "Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger",
        "dialog",
      ),
      code: `<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>This action cannot be undone.</DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`,
    },
    examples: [{ name: "dialog-share", title: "Share link" }],
    api: [
      {
        name: "Dialog",
        props: [
          ["open / defaultOpen", "boolean", undefined, "Controlled or initial state."],
          ["onOpenChange", "(open: boolean) => void", undefined, "Called on change."],
          ["modal", "boolean", "true", "Render the rest of the page inert."],
        ],
      },
      {
        name: "DialogContent",
        props: [["showCloseButton", "boolean", "true", "Render the close button."], cls],
      },
      {
        name: "DialogFooter",
        props: [["showCloseButton", "boolean", "false", "Add a Close button to the footer."], cls],
      },
    ],
    a11y: {
      notes:
        "Every dialog needs a `DialogTitle`. If you do not want it visible, wrap it in `VisuallyHidden` or add `sr-only`.",
      keys: dialogKeys,
    },
  },
  {
    name: "drawer",
    usage: {
      imports: imp(
        "Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger",
        "drawer",
      ),
      code: `<Drawer>
  <DrawerTrigger>Open</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Are you sure?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
  </DrawerContent>
</Drawer>`,
    },
    api: [
      {
        name: "Drawer",
        description: "Accepts every [Vaul](https://vaul.emilkowal.ski) root prop.",
        props: [
          [
            "direction",
            '"top" | "right" | "bottom" | "left"',
            '"bottom"',
            "Edge the drawer slides from.",
          ],
          ["shouldScaleBackground", "boolean", "true", "Scale the page behind the drawer."],
          ["snapPoints", "(number | string)[]", undefined, "Snap points as fractions or pixels."],
        ],
      },
    ],
    a11y: {
      notes: "Drag to dismiss on touch. On keyboard it behaves like a dialog.",
      keys: dialogKeys,
    },
  },
  {
    name: "dropdown-menu",
    usage: {
      imports: imp(
        "DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger",
        "dropdown-menu",
      ),
      code: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    },
    examples: [{ name: "dropdown-menu-checkboxes", title: "Checkboxes and radios" }],
    api: [
      content("DropdownMenuContent"),
      {
        name: "DropdownMenuItem",
        props: [
          ["variant", '"default" | "destructive"', '"default"', "Visual style."],
          ["inset", "boolean", "false", "Indent to align with icon items."],
          ["disabled", "boolean", "false", "Prevents selection."],
          ["onSelect", "(event) => void", undefined, "Called when selected."],
        ],
      },
    ],
    a11y: { keys: menuKeys },
  },
  {
    name: "empty-state",
    intro: "Exported from both `@/components/ui/empty` and `@/components/ui/empty-state`.",
    usage: {
      imports: imp(
        "Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle",
        "empty",
      ),
      code: `<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon"><FolderIcon /></EmptyMedia>
    <EmptyTitle>No projects yet</EmptyTitle>
    <EmptyDescription>Create your first project to get started.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Create project</Button>
  </EmptyContent>
</Empty>`,
    },
    examples: [{ name: "empty-state-search", title: "No search results" }],
    api: [
      {
        name: "EmptyMedia",
        props: [
          ["variant", '"default" | "icon"', '"default"', "Use icon for a framed icon tile."],
          cls,
        ],
      },
      { name: "Empty / EmptyHeader / EmptyTitle / EmptyDescription / EmptyContent", props: [cls] },
    ],
  },
  {
    name: "form",
    intro:
      "Composable wrappers around [React Hook Form](https://react-hook-form.com) that wire up ids, labels, descriptions and error messages for you. Validate with Zod or any schema library.",
    usage: {
      imports: `import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";`,
      code: `const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl><Input {...field} /></FormControl>
          <FormDescription>Your public display name.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  </form>
</Form>`,
    },
    api: [
      {
        name: "FormField",
        props: [
          ["control", "Control", undefined, "From useForm()."],
          ["name", "FieldPath", undefined, "Field name."],
          ["render", "({ field, fieldState }) => ReactNode", undefined, "Renders the field."],
        ],
      },
      { name: "FormItem / FormLabel / FormDescription / FormMessage", props: [cls] },
      {
        name: "FormControl",
        description: "Slot that passes `id`, `aria-describedby` and `aria-invalid` to its child.",
        props: [],
      },
    ],
    a11y: {
      notes:
        'Labels point at their control, descriptions and errors are linked with `aria-describedby`, and errors render with `role="alert"` so they are announced.',
    },
  },
  {
    name: "hover-card",
    usage: {
      imports: imp("HoverCard, HoverCardContent, HoverCardTrigger", "hover-card"),
      code: `<HoverCard>
  <HoverCardTrigger>Hover</HoverCardTrigger>
  <HoverCardContent>The React Framework, created and maintained by @vercel.</HoverCardContent>
</HoverCard>`,
    },
    api: [
      {
        name: "HoverCard",
        props: [
          ["openDelay", "number", "700", "Delay before opening, in ms."],
          ["closeDelay", "number", "300", "Delay before closing, in ms."],
        ],
      },
      content("HoverCardContent"),
    ],
    a11y: {
      notes:
        "Hover cards are for sighted mouse users only. Content inside must also be reachable another way, because keyboard and screen-reader users cannot open it.",
    },
  },
  {
    name: "input",
    usage: { imports: imp("Input", "input"), code: `<Input type="email" placeholder="Email" />` },
    examples: [
      { name: "input-with-label", title: "With label and hint" },
      { name: "input-states", title: "File, disabled and invalid" },
      {
        name: "input-group-demo",
        title: "Input group",
        description: "Add icons, text and buttons inside the field with `InputGroup`.",
      },
    ],
    api: [
      {
        name: "Input",
        description: "Accepts every native input attribute.",
        props: [
          ["type", "string", '"text"', "Input type."],
          ["aria-invalid", "boolean", undefined, "Shows the error style."],
          cls,
        ],
      },
    ],
  },
  {
    name: "input-otp",
    usage: {
      imports: imp("InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot", "input-otp"),
      code: `<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
    },
    examples: [
      {
        name: "input-otp-controlled",
        title: "Controlled with digits only",
        description: "Use the `REGEXP_ONLY_DIGITS` pattern from input-otp.",
      },
    ],
    api: [
      {
        name: "InputOTP",
        props: [
          ["maxLength", "number", undefined, "Number of characters."],
          ["value / onChange", "string / (value: string) => void", undefined, "Controlled value."],
          ["pattern", "string", undefined, "Allowed characters, as a regex string."],
          ["onComplete", "(value: string) => void", undefined, "Called when every slot is filled."],
          cls,
        ],
      },
      { name: "InputOTPSlot", props: [["index", "number", undefined, "Slot position."], cls] },
    ],
    a11y: {
      notes:
        'Uses a single hidden native input, so paste, autofill (`autocomplete="one-time-code"`) and screen readers work as expected.',
    },
  },
  {
    name: "kbd",
    usage: {
      imports: imp("Kbd, KbdGroup", "kbd"),
      code: `<KbdGroup>\n  <Kbd>⌘</Kbd>\n  <Kbd>K</Kbd>\n</KbdGroup>`,
    },
    api: [{ name: "Kbd / KbdGroup", props: [cls] }],
  },
  {
    name: "label",
    usage: {
      imports: imp("Label", "label"),
      code: `<Label htmlFor="email">Your email address</Label>`,
    },
    api: [
      {
        name: "Label",
        props: [["htmlFor", "string", undefined, "The id of the control it labels."], cls],
      },
    ],
    a11y: {
      notes:
        "Clicking a label focuses or toggles its control. Always associate labels with controls using `htmlFor` and `id`.",
    },
  },
  {
    name: "menubar",
    usage: {
      imports: imp(
        "Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarShortcut, MenubarTrigger",
        "menubar",
      ),
      code: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>New Tab <MenubarShortcut>⌘T</MenubarShortcut></MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
    },
    api: [
      content("MenubarContent"),
      {
        name: "MenubarItem",
        props: [
          ["inset", "boolean", "false", "Indent to align with icon items."],
          ["disabled", "boolean", "false", "Prevents selection."],
        ],
      },
    ],
    a11y: {
      keys: [
        ...menuKeys,
        ["ArrowRight / ArrowLeft", "Moves between top-level menus when a menu is open."],
      ],
    },
  },
  {
    name: "navigation-menu",
    usage: {
      imports: imp(
        "NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger",
        "navigation-menu",
      ),
      code: `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink>Link</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`,
    },
    api: [
      {
        name: "NavigationMenu",
        props: [
          ["viewport", "boolean", "true", "Render content in a shared animated viewport."],
          ["delayDuration", "number", "200", "Hover delay before opening."],
          cls,
        ],
      },
      {
        name: "NavigationMenuLink",
        props: [asChild, ["active", "boolean", "false", "Marks the current page."], cls],
      },
    ],
    a11y: {
      keys: [
        ["Space / Enter", "Opens the focused trigger's content."],
        ["Tab", "Moves focus to the next focusable element."],
        ["ArrowDown", "Moves focus into the open content."],
        ["ArrowRight / ArrowLeft", "Moves focus between triggers."],
        ["Esc", "Closes the open content."],
      ],
    },
  },
  {
    name: "pagination",
    usage: {
      imports: imp(
        "Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious",
        "pagination",
      ),
      code: `<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
    <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
    <PaginationItem><PaginationNext href="#" /></PaginationItem>
  </PaginationContent>
</Pagination>`,
    },
    api: [
      {
        name: "PaginationLink",
        props: [
          ["isActive", "boolean", "false", 'Marks the current page with aria-current="page".'],
          ["size", "ButtonSize", '"icon"', "Button size."],
          cls,
        ],
      },
    ],
    a11y: {
      notes:
        'Renders a `nav` with `aria-label="pagination"`. Previous and Next have accessible labels.',
    },
  },
  {
    name: "popover",
    usage: {
      imports: imp("Popover, PopoverContent, PopoverTrigger", "popover"),
      code: `<Popover>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent>Place content for the popover here.</PopoverContent>
</Popover>`,
    },
    api: [
      {
        name: "Popover",
        props: [
          ["open / defaultOpen", "boolean", undefined, "Controlled or initial state."],
          ["onOpenChange", "(open) => void", undefined, "Called on change."],
          ["modal", "boolean", "false", "Trap focus and make outside content inert."],
        ],
      },
      content("PopoverContent"),
    ],
    a11y: {
      keys: [
        ["Space / Enter", "Opens or closes the popover."],
        ["Tab", "Moves focus to the next focusable element inside."],
        ["Esc", "Closes the popover and returns focus."],
      ],
    },
  },
  {
    name: "progress",
    usage: { imports: imp("Progress", "progress"), code: `<Progress value={33} />` },
    api: [
      {
        name: "Progress",
        props: [
          [
            "value",
            "number | null",
            undefined,
            "Progress from 0 to max. Null means indeterminate.",
          ],
          ["max", "number", "100", "Maximum value."],
          cls,
        ],
      },
    ],
    a11y: {
      notes:
        'Renders `role="progressbar"` with `aria-valuenow`. Provide an `aria-label` or `aria-labelledby`.',
    },
  },
  {
    name: "radio-group",
    usage: {
      imports: imp("RadioGroup, RadioGroupItem", "radio-group"),
      code: `<RadioGroup defaultValue="option-one">
  <div className="flex items-center gap-3">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Option One</Label>
  </div>
</RadioGroup>`,
    },
    examples: [{ name: "radio-group-cards", title: "Cards" }],
    api: [
      {
        name: "RadioGroup",
        props: [
          ["value / defaultValue", "string", undefined, "Selected value."],
          ["onValueChange", "(value: string) => void", undefined, "Called on change."],
          ["orientation", '"horizontal" | "vertical"', undefined, "Arrow-key direction."],
          ["disabled", "boolean", "false", "Disables every item."],
          cls,
        ],
      },
      {
        name: "RadioGroupItem",
        props: [
          ["value", "string", undefined, "Item value."],
          ["disabled", "boolean", "false", "Disables the item."],
          cls,
        ],
      },
    ],
    a11y: {
      keys: [
        ["Tab", "Moves focus to the checked item, or the first item."],
        ["Space", "Checks the focused item."],
        ["ArrowDown / ArrowRight", "Moves focus to and checks the next item."],
        ["ArrowUp / ArrowLeft", "Moves focus to and checks the previous item."],
      ],
    },
  },
  {
    name: "resizable",
    usage: {
      imports: imp("ResizableHandle, ResizablePanel, ResizablePanelGroup", "resizable"),
      code: `<ResizablePanelGroup orientation="horizontal">
  <ResizablePanel defaultSize="50%">One</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize="50%">Two</ResizablePanel>
</ResizablePanelGroup>`,
    },
    api: [
      {
        name: "ResizablePanelGroup",
        props: [
          ["orientation", '"horizontal" | "vertical"', '"horizontal"', "Layout direction."],
          ["onLayoutChange", "(layout) => void", undefined, "Called while resizing."],
          cls,
        ],
      },
      {
        name: "ResizablePanel",
        props: [
          ["defaultSize", "number | string", undefined, 'Initial size, e.g. "40%".'],
          ["minSize / maxSize", "number | string", undefined, "Size constraints."],
          ["collapsible", "boolean", "false", "Collapse below minSize."],
        ],
      },
      {
        name: "ResizableHandle",
        props: [["withHandle", "boolean", "false", "Show a visible grip."], cls],
      },
    ],
    a11y: {
      keys: [
        ["ArrowLeft / ArrowRight", "Resizes horizontal panels."],
        ["ArrowUp / ArrowDown", "Resizes vertical panels."],
        ["Home / End", "Collapses or expands to the limit."],
      ],
    },
  },
  {
    name: "scroll-area",
    usage: {
      imports: imp("ScrollArea", "scroll-area"),
      code: `<ScrollArea className="h-72 w-48 rounded-md border">...</ScrollArea>`,
    },
    examples: [
      {
        name: "scroll-area-horizontal",
        title: "Horizontal",
        description: "Add a horizontal `ScrollBar`.",
      },
    ],
    api: [
      {
        name: "ScrollArea",
        props: [
          [
            "type",
            '"auto" | "always" | "scroll" | "hover"',
            '"hover"',
            "When scrollbars are visible.",
          ],
          cls,
        ],
      },
      {
        name: "ScrollBar",
        props: [["orientation", '"vertical" | "horizontal"', '"vertical"', "Scrollbar axis."], cls],
      },
    ],
  },
  {
    name: "select",
    usage: {
      imports: imp("Select, SelectContent, SelectItem, SelectTrigger, SelectValue", "select"),
      code: `<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
  </SelectContent>
</Select>`,
    },
    api: [
      {
        name: "Select",
        props: [
          ["value / defaultValue", "string", undefined, "Selected value."],
          ["onValueChange", "(value: string) => void", undefined, "Called on change."],
          ["disabled", "boolean", "false", "Disables the select."],
          ["name", "string", undefined, "Form field name."],
        ],
      },
      {
        name: "SelectTrigger",
        props: [["size", '"sm" | "default"', '"default"', "Trigger height."], cls],
      },
      {
        name: "SelectContent",
        props: [
          ["position", '"item-aligned" | "popper"', '"item-aligned"', "Positioning mode."],
          cls,
        ],
      },
    ],
    a11y: {
      keys: [
        ["Space / Enter", "Opens the select, or selects the focused item."],
        ["ArrowDown / ArrowUp", "Moves focus between items."],
        ["Esc", "Closes the select."],
        ["Type a letter", "Jumps to the matching item."],
      ],
    },
  },
  {
    name: "separator",
    usage: { imports: imp("Separator", "separator"), code: `<Separator />` },
    api: [
      {
        name: "Separator",
        props: [
          ["orientation", '"horizontal" | "vertical"', '"horizontal"', "Direction."],
          ["decorative", "boolean", "true", "When true, hidden from assistive technology."],
          cls,
        ],
      },
    ],
  },
  {
    name: "sheet",
    usage: {
      imports: imp(
        "Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger",
        "sheet",
      ),
      code: `<Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>This action cannot be undone.</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>`,
    },
    examples: [{ name: "sheet-side", title: "Side" }],
    api: [
      {
        name: "SheetContent",
        props: [
          ["side", '"top" | "right" | "bottom" | "left"', '"right"', "Edge the sheet slides from."],
          ["showCloseButton", "boolean", "true", "Render the close button."],
          cls,
        ],
      },
    ],
    a11y: { keys: dialogKeys },
  },
  {
    name: "sidebar",
    iframe: true,
    height: 560,
    intro:
      "A composable, collapsible application sidebar. It persists its state in a cookie, collapses to icons, and becomes a sheet on mobile. Press `⌘B` / `Ctrl+B` to toggle it.",
    usage: {
      imports: imp(
        "Sidebar, SidebarContent, SidebarInset, SidebarProvider, SidebarTrigger",
        "sidebar",
      ),
      code: `<SidebarProvider>
  <Sidebar collapsible="icon">
    <SidebarContent>...</SidebarContent>
  </Sidebar>
  <SidebarInset>
    <SidebarTrigger />
    <main>...</main>
  </SidebarInset>
</SidebarProvider>`,
    },
    api: [
      {
        name: "SidebarProvider",
        props: [
          ["defaultOpen", "boolean", "true", "Initial state."],
          ["open / onOpenChange", "boolean / (open) => void", undefined, "Controlled state."],
        ],
      },
      {
        name: "Sidebar",
        props: [
          ["side", '"left" | "right"', '"left"', "Edge."],
          ["variant", '"sidebar" | "floating" | "inset"', '"sidebar"', "Visual style."],
          ["collapsible", '"offcanvas" | "icon" | "none"', '"offcanvas"', "Collapse behavior."],
          cls,
        ],
      },
      {
        name: "SidebarMenuButton",
        props: [
          ["isActive", "boolean", "false", "Marks the current item."],
          ["tooltip", "string | TooltipContentProps", undefined, "Shown when collapsed to icons."],
          ["size", '"sm" | "default" | "lg"', '"default"', "Item height."],
          asChild,
        ],
      },
      {
        name: "useSidebar()",
        description:
          "Returns `state`, `open`, `setOpen`, `openMobile`, `setOpenMobile`, `isMobile` and `toggleSidebar`.",
        props: [],
      },
    ],
    a11y: { keys: [["⌘ + B / Ctrl + B", "Toggles the sidebar."]] },
  },
  {
    name: "skeleton",
    usage: { imports: imp("Skeleton", "skeleton"), code: `<Skeleton className="h-4 w-[250px]" />` },
    examples: [{ name: "skeleton-card", title: "Card" }],
    api: [{ name: "Skeleton", props: [cls] }],
    a11y: {
      notes:
        'Mark the loading region with `aria-busy="true"` and a label so assistive technology knows content is loading.',
    },
  },
  {
    name: "slider",
    usage: {
      imports: imp("Slider", "slider"),
      code: `<Slider defaultValue={[33]} max={100} step={1} />`,
    },
    examples: [
      { name: "slider-range", title: "Range", description: "Pass two values to get two thumbs." },
    ],
    api: [
      {
        name: "Slider",
        props: [
          ["value / defaultValue", "number[]", undefined, "Thumb values."],
          ["onValueChange", "(value: number[]) => void", undefined, "Called while dragging."],
          [
            "onValueCommit",
            "(value: number[]) => void",
            undefined,
            "Called when the user stops dragging.",
          ],
          ["min / max / step", "number", "0 / 100 / 1", "Range and granularity."],
          ["orientation", '"horizontal" | "vertical"', '"horizontal"', "Direction."],
          cls,
        ],
      },
    ],
    a11y: {
      keys: [
        ["ArrowRight / ArrowUp", "Increases by one step."],
        ["ArrowLeft / ArrowDown", "Decreases by one step."],
        ["PageUp / PageDown", "Changes by a larger step."],
        ["Home / End", "Sets the minimum or maximum."],
      ],
    },
  },
  {
    name: "sonner",
    intro: "Add the `Toaster` once in your root layout, then call `toast()` from anywhere.",
    usage: {
      imports: `import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";`,
      code: `// app/layout.tsx
<body>
  {children}
  <Toaster />
</body>

// anywhere
toast.success("Event has been created.");`,
    },
    examples: [{ name: "sonner-types", title: "Types" }],
    api: [
      {
        name: "Toaster",
        description: "Accepts every [Sonner](https://sonner.emilkowal.ski) Toaster prop.",
        props: [
          [
            "position",
            '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"',
            '"bottom-right"',
            "Stack position.",
          ],
          ["richColors", "boolean", "false", "Colored success and error toasts."],
          ["expand", "boolean", "false", "Expand the stack by default."],
        ],
      },
      {
        name: "toast()",
        props: [
          ["description", "ReactNode", undefined, "Secondary text."],
          ["action", "{ label, onClick }", undefined, "Action button."],
          ["duration", "number", "4000", "Time on screen in ms."],
        ],
      },
    ],
    a11y: {
      notes:
        "Toasts are announced in a polite live region. Do not put critical, blocking information only in a toast.",
      keys: [["Alt + T", "Moves focus to the toast region."]],
    },
  },
  {
    name: "spinner",
    usage: { imports: imp("Spinner", "spinner"), code: `<Spinner />` },
    api: [{ name: "Spinner", description: "Accepts every SVG attribute.", props: [cls] }],
    a11y: {
      notes:
        'Renders `role="status"` with `aria-label="Loading"`. Override the label when the context is more specific.',
    },
  },
  {
    name: "switch",
    usage: {
      imports: imp("Switch", "switch"),
      code: `<Switch id="airplane" />\n<Label htmlFor="airplane">Airplane mode</Label>`,
    },
    examples: [{ name: "switch-settings", title: "Settings rows" }],
    api: [
      {
        name: "Switch",
        props: [
          ["checked / defaultChecked", "boolean", undefined, "Controlled or initial state."],
          ["onCheckedChange", "(checked: boolean) => void", undefined, "Called on toggle."],
          ["size", '"sm" | "default"', '"default"', "Switch size."],
          ["disabled", "boolean", "false", "Prevents interaction."],
          cls,
        ],
      },
    ],
    a11y: {
      keys: [
        ["Space", "Toggles the switch."],
        ["Enter", "Toggles the switch."],
      ],
    },
  },
  {
    name: "table",
    usage: {
      imports: imp(
        "Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow",
        "table",
      ),
      code: `<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
    },
    api: [
      {
        name: "Table / TableHeader / TableBody / TableFooter / TableRow / TableHead / TableCell / TableCaption",
        props: [cls],
      },
    ],
    extra: "For sorting, filtering and pagination, see [Data Table](/docs/components/data-table).",
  },
  {
    name: "tabs",
    usage: {
      imports: imp("Tabs, TabsContent, TabsList, TabsTrigger", "tabs"),
      code: `<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings.</TabsContent>
  <TabsContent value="password">Change your password.</TabsContent>
</Tabs>`,
    },
    examples: [{ name: "tabs-line", title: "Line variant" }],
    api: [
      {
        name: "Tabs",
        props: [
          ["value / defaultValue", "string", undefined, "Active tab."],
          ["onValueChange", "(value: string) => void", undefined, "Called on change."],
          ["orientation", '"horizontal" | "vertical"', '"horizontal"', "Layout direction."],
          cls,
        ],
      },
      {
        name: "TabsList",
        props: [["variant", '"default" | "line"', '"default"', "Visual style."], cls],
      },
    ],
    a11y: {
      keys: [
        ["Tab", "Moves focus into the active tab, then into the panel."],
        ["ArrowRight / ArrowLeft", "Moves to the next or previous tab."],
        ["Home / End", "Moves to the first or last tab."],
      ],
    },
    extra: "For a sliding animated indicator, see [Animated Tabs](/docs/animated/animated-tabs).",
  },
  {
    name: "textarea",
    usage: {
      imports: imp("Textarea", "textarea"),
      code: `<Textarea placeholder="Type your message here." />`,
    },
    api: [
      {
        name: "Textarea",
        description:
          "Accepts every native textarea attribute. Grows with its content via `field-sizing: content`.",
        props: [cls],
      },
    ],
  },
  {
    name: "toggle",
    usage: {
      imports: imp("Toggle", "toggle"),
      code: `<Toggle aria-label="Toggle italic">\n  <ItalicIcon />\n</Toggle>`,
    },
    api: [
      {
        name: "Toggle",
        props: [
          ["pressed / defaultPressed", "boolean", undefined, "Controlled or initial state."],
          ["onPressedChange", "(pressed: boolean) => void", undefined, "Called on toggle."],
          ["variant", '"default" | "outline"', '"default"', "Visual style."],
          ["size", '"sm" | "default" | "lg"', '"default"', "Size."],
          cls,
        ],
      },
    ],
    a11y: {
      keys: [
        ["Space", "Toggles the pressed state."],
        ["Enter", "Toggles the pressed state."],
      ],
    },
  },
  {
    name: "toggle-group",
    usage: {
      imports: imp("ToggleGroup, ToggleGroupItem", "toggle-group"),
      code: `<ToggleGroup type="single">
  <ToggleGroupItem value="a">A</ToggleGroupItem>
  <ToggleGroupItem value="b">B</ToggleGroupItem>
</ToggleGroup>`,
    },
    api: [
      {
        name: "ToggleGroup",
        props: [
          ["type", '"single" | "multiple"', undefined, "Selection mode."],
          ["value / defaultValue", "string | string[]", undefined, "Pressed item(s)."],
          ["onValueChange", "(value) => void", undefined, "Called on change."],
          ["variant / size", "ToggleVariants", undefined, "Applied to every item."],
          ["spacing", "number", "0", "Gap between items. 0 joins them."],
          cls,
        ],
      },
    ],
    a11y: {
      keys: [
        ["Tab", "Moves focus to the pressed item, or the first item."],
        ["Space / Enter", "Toggles the focused item."],
        ["ArrowRight / ArrowLeft", "Moves focus between items."],
      ],
    },
  },
  {
    name: "tooltip",
    intro: "Wrap your app in `TooltipProvider` once (this site does it in the root layout).",
    usage: {
      imports: imp("Tooltip, TooltipContent, TooltipProvider, TooltipTrigger", "tooltip"),
      code: `<Tooltip>
  <TooltipTrigger>Hover</TooltipTrigger>
  <TooltipContent>Add to library</TooltipContent>
</Tooltip>`,
    },
    api: [
      {
        name: "TooltipProvider",
        props: [
          ["delayDuration", "number", "0", "Delay before opening, in ms."],
          ["skipDelayDuration", "number", "300", "Time to open the next tooltip instantly."],
        ],
      },
      content("TooltipContent"),
    ],
    a11y: {
      notes:
        "Tooltips open on hover and focus. Keep their content short and never place interactive content inside.",
      keys: [
        ["Tab", "Focusing the trigger opens the tooltip."],
        ["Esc", "Closes the tooltip."],
      ],
    },
    extra: "## More designs\n\nSee [Animated Tooltip](/docs/animated/animated-tooltip).",
  },
];
