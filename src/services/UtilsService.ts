const UtilsService = {
  debounce: (action: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => action(...args), delay);
    };
  }
}

export default UtilsService;