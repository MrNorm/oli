import type { Config } from "vike/types";
import vikePhoton from 'vike-photon/config'
import vikeReact from 'vike-react/config'

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/head-tags
  title: "Oliver Northam",
  description: "Developer, designer, and builder of digital experiences. Explore my projects, writings, and creative experiments.",

  extends: [vikePhoton, vikeReact],
} satisfies Config;
