import type { StoryObj, Meta } from "@storybook/vue3";

import { fn } from "@storybook/test";
import { BaizeTooltip } from "baize-ui";
import 'baize-ui/dist/theme/Tooltip.css'

type Story = StoryObj<typeof BaizeTooltip>;

const meta: Meta<typeof BaizeTooltip> = {
  title: "Example/Tooltip",
  component: BaizeTooltip,
  tags: ["autodocs"],
  argTypes: {
    trigger: {
      options: ["hover", "click", "contextmenu"],
      control: {
        type: "select",
      },
    },
    placement: {
      options: ["top", "bottom", "left", "right"],
      control: {
        type: "select",
      },
    },
  },
  args: {
    "onVisible-change": fn(),
  },
};

export const Default: Story = {
  args: {
    content: "This is a tooltip",
    placement: "top",
    trigger: "hover",
  },
  render: (args) => ({
    components: { BaizeTooltip },
    setup() {
      return {
        args,
      };
    },
    template: `
      <BaizeTooltip v-bind="args">
          <div style="height:30px;width:200px;background:red;padding:auto">trigger</div>
      </BaizeTooltip>
    `,
  }),
};

export default meta;