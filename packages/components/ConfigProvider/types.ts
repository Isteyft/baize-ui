import type { Language, TranslatePair } from "@baize-ui/locale";

export interface ConfigProviderProps {
  locale?: Language;
  extendsI18nMsg?: TranslatePair;
}
