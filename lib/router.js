/**
 * URL 경로 변경과 DOM 변경을 감지하여 등록된 함수를 실행하는 라우터입니다.
 */
class PageDispatcher {
  /**
   * @param {boolean} [runOnSamePath=false] - 동일한 URL 경로에서 DOM 변경이 있을 때 핸들러를 다시 실행할지 여부.
   */
  constructor(runOnSamePath = false) {
    this.routes = [];
    this.lastExecutedPath = null;
    this.observer = null;

    this.runOnSamePath = runOnSamePath;
  }

  /**
   * @param {string} urlPattern - 매칭할 URL 경로 (예: '/live').
   * @param {function(): void} handler - 해당 경로에서 실행될 함수.
   */
  register(urlPattern, handler) {
    this.routes.push({ pattern: urlPattern, handler: handler });
  }

  /**
   * DOM 변경 시, URL을 확인하여 일치하는 핸들러를 실행합니다.
   */
  dynamicDispatch = () => {
    const currentPath = window.location.pathname;

    if (!this.runOnSamePath && currentPath === this.lastExecutedPath) return;

    let routeMatched = false;
    for (const route of this.routes) {
      if (currentPath.startsWith(route.pattern)) {
        route.handler();

        this.lastExecutedPath = currentPath;
        routeMatched = true;

        break;
      }
    }

    if (!routeMatched) this.lastExecutedPath = null;
  };

  /**
   * MutationObserver Setup & Start
   */
  start() {
    this.observer = new MutationObserver(this.dynamicDispatch);
    this.observer.observe(document.body, { childList: true, subtree: true });
  }
}
