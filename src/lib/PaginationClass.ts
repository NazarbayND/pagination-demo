export class PaginationClass {
  private totalPages: number;
  private currentPage: number;
  private isLooped: boolean;
  private pageStep: number;

  constructor(
    totalPages: number,
    isLooped: boolean = false,
    initialPage: number = 1,
    pageStep: number = 1
  ) {
    this.totalPages = totalPages;
    this.isLooped = isLooped;
    this.currentPage = initialPage;
    this.pageStep = pageStep;

    this.validateCurrentPage();
  }

  public setLoop(isLooped: boolean) {
    this.isLooped = isLooped;
  }

  public setTotalPages(total: number) {
    this.totalPages = total;
    this.validateCurrentPage();
  }

  public getTotalPages() {
    return this.totalPages;
  }

  public getCurrentPage() {
    return this.currentPage;
  }

  public goToPage(page: number) {
    if (this.isLooped) {
      if (page < 1) {
        this.currentPage = this.totalPages;
      } else if (page > this.totalPages) {
        this.currentPage = 1;
      } else {
        this.currentPage = page;
      }
    } else {
      if (page < 1) {
        this.currentPage = 1;
      } else if (page > this.totalPages) {
        this.currentPage = this.totalPages;
      } else {
        this.currentPage = page;
      }
    }
  }

  public nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  public prevPage() {
    this.goToPage(this.currentPage - 1);
  }

  public nextMultiPage() {
    this.goToPage(this.currentPage + this.pageStep);
  }

  public prevMultiPage() {
    this.goToPage(this.currentPage - this.pageStep);
  }

  private validateCurrentPage() {
    if (this.currentPage < 1) {
      this.currentPage = 1;
    } else if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }
}
