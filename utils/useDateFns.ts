import { formatDistance as _formatDistance } from 'date-fns';

export default function () {
  const { localeProperties } = useI18n();

  const resolveLocale = async () => {
    let localeModule;

    // eslint-disable-next-line unicorn/prefer-ternary
    if (localeProperties.value.iso === 'cs') {
      localeModule = await import('date-fns/locale/cs');
    } else {
      localeModule = await import('date-fns/locale/en-US');
    }

    return localeModule;
  };

  const formatDistance = async (targetDate: Date) => {
    const locale = await resolveLocale();

    return _formatDistance(targetDate, new Date(), {
      addSuffix: true,
      includeSeconds: true,
      locale: locale.default,
    });
  };

  return {
    formatDistance,
  };
}
