export function createFocusReturn(trigger: HTMLElement, container: HTMLElement) {
  const focusableSelector = "a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";
  const first = () => container.querySelector<HTMLElement>(focusableSelector);
  return {
    enter() {
      first()?.focus();
    },
    return() {
      trigger.focus();
    }
  };
}
