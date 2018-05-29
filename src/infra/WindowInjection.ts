namespace WindowInjection {
  const injectPrefixKey = "WindowInjection";

  export function setObject<T>(key: string, object: T) {
    (window as any)[`__${injectPrefixKey}__${key}__`] = object;
  }

  export function contains(key: string) {
    return (window as any)[`__${injectPrefixKey}__${key}__`] != null;
  }

  export function getObject<T>(key: string, defaultValue?: T): T | undefined {
    return (window as any)[`__${injectPrefixKey}__${key}__`] != null
      ? (window as any)[`__${injectPrefixKey}__${key}__`]
      : defaultValue;
  }
}

export default WindowInjection;
