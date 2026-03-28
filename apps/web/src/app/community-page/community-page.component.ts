import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { PostResponse } from '@shared/models/data/post-response.model';
import { PostService } from '@shared/services/post.service';
import { Pagination } from '@shared/models/request/pagination.model';
import Swal from 'sweetalert2';

type PostTab = 'all' | 'mine';

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzIconModule,
    NzMessageModule,
    NzModalModule,
    NzPaginationModule,
    NzSpinModule,
  ],
})
export class CommunityPageComponent implements OnInit, OnDestroy {
  readonly maxContentLength = 500;

  activeTab: PostTab = 'all';
  posts: PostResponse[] = [];
  myPosts: PostResponse[] = [];
  allPagination: Pagination = { currentPage: 1, pageSize: 6 };
  minePagination: Pagination = { currentPage: 1, pageSize: 6 };
  allTotalElements = 0;
  allTotalPages = 1;
  mineTotalElements = 0;
  mineTotalPages = 1;

  loadingAll = true;
  loadingMine = true;
  errorAll = '';
  errorMine = '';

  isCreateModalOpen = false;
  newContent = '';
  newImageFile: File | null = null;
  newImagePreview = '';
  isSubmitting = false;

  editPostId: number | null = null;
  editContent = '';
  editImageFile: File | null = null;
  editImagePreview = '';
  updatingId: number | null = null;
  deletingId: number | null = null;

  private previewUrls: string[] = [];

  constructor(
    private postService: PostService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    document.title = 'Community';
    window.scrollTo(0, 0);
    this.loadAllPosts();
    this.loadMyPosts();
  }

  ngOnDestroy(): void {
    this.previewUrls.forEach((url) => URL.revokeObjectURL(url));
  }

  setTab(tab: PostTab) {
    this.activeTab = tab;
  }

  get activePosts(): PostResponse[] {
    return this.activeTab === 'all' ? this.posts : this.myPosts;
  }

  get activeTotalElements(): number {
    return this.activeTab === 'all'
      ? this.allTotalElements
      : this.mineTotalElements;
  }

  get activeTotalPages(): number {
    return this.activeTab === 'all' ? this.allTotalPages : this.mineTotalPages;
  }

  loadAllPosts() {
    this.loadingAll = true;
    this.errorAll = '';

    this.postService.getAllPosts(this.allPagination).subscribe({
      next: (res) => {
        this.posts = res?.result || [];
        this.allTotalElements = res?.totalElements || 0;
        this.allTotalPages = res?.totalPages || 1;
        this.allPagination.currentPage = res?.currentPage || 1;
        this.allPagination.pageSize =
          res?.pageSize || this.allPagination.pageSize;
      },
      error: () => {
        this.errorAll = 'Cannot load posts right now.';
      },
      complete: () => {
        this.loadingAll = false;
      },
    });
  }

  loadMyPosts() {
    this.loadingMine = true;
    this.errorMine = '';

    this.postService.getPostsByCurrentUser(this.minePagination).subscribe({
      next: (res) => {
        this.myPosts = res?.result || [];
        this.mineTotalElements = res?.totalElements || 0;
        this.mineTotalPages = res?.totalPages || 1;
        this.minePagination.currentPage = res?.currentPage || 1;
        this.minePagination.pageSize =
          res?.pageSize || this.minePagination.pageSize;
      },
      error: () => {
        this.errorMine = 'Cannot load your posts right now.';
      },
      complete: () => {
        this.loadingMine = false;
      },
    });
  }

  changeAllPage(page: number) {
    this.allPagination.currentPage = page;
    this.loadAllPosts();
  }

  changeAllPageSize(size: number) {
    this.allPagination.pageSize = size;
    this.allPagination.currentPage = 1;
    this.loadAllPosts();
  }

  changeMinePage(page: number) {
    this.minePagination.currentPage = page;
    this.loadMyPosts();
  }

  changeMinePageSize(size: number) {
    this.minePagination.pageSize = size;
    this.minePagination.currentPage = 1;
    this.loadMyPosts();
  }

  openCreateModal() {
    this.isCreateModalOpen = true;
  }

  closeCreateModal() {
    if (this.isSubmitting) {
      return;
    }
    this.isCreateModalOpen = false;
  }

  onNewImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;

    this.newImageFile = file;
    this.newImagePreview = '';

    if (file) {
      const url = URL.createObjectURL(file);
      this.previewUrls.push(url);
      this.newImagePreview = url;
    }
  }

  clearNewImage() {
    this.newImageFile = null;
    this.newImagePreview = '';
  }

  createPost() {
    const trimmed = this.newContent.trim();

    if (!trimmed) {
      this.message.warning('Please enter your post content.');
      return;
    }

    if (trimmed.length > this.maxContentLength) {
      this.message.warning('Post content is too long.');
      return;
    }

    this.isSubmitting = true;

    this.postService.createPost(trimmed, this.newImageFile).subscribe({
      next: () => {
        this.message.success('Post created successfully.');
        this.newContent = '';
        this.clearNewImage();
        this.closeCreateModal();
        this.allPagination.currentPage = 1;
        this.minePagination.currentPage = 1;
        this.loadAllPosts();
        this.loadMyPosts();
      },
      error: () => {
        this.message.error('Failed to create post.');
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }

  startEdit(post: PostResponse) {
    this.editPostId = post.id;
    this.editContent = post.content || '';
    this.editImageFile = null;
    this.editImagePreview = post.image || '';
  }

  cancelEdit() {
    this.editPostId = null;
    this.editContent = '';
    this.editImageFile = null;
    this.editImagePreview = '';
  }

  onEditImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;

    this.editImageFile = file;
    if (file) {
      const url = URL.createObjectURL(file);
      this.previewUrls.push(url);
      this.editImagePreview = url;
    }
  }

  updatePost(postId: number) {
    const trimmed = this.editContent.trim();

    if (!trimmed) {
      this.message.warning('Content is required.');
      return;
    }

    this.updatingId = postId;

    this.postService.updatePost(postId, trimmed, this.editImageFile).subscribe({
      next: () => {
        this.message.success('Post updated.');
        this.cancelEdit();
        this.loadAllPosts();
        this.loadMyPosts();
      },
      error: () => {
        this.message.error('Failed to update post.');
      },
      complete: () => {
        this.updatingId = null;
      },
    });
  }

  deletePost(postId: number) {
    Swal.fire({
      title: 'Delete Confirmation',
      text: 'Are you sure you want to delete this post?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmDelete(postId);
      }
    });
  }

  confirmDelete(postId: number) {
    this.deletingId = postId;

    this.postService.deletePost(postId).subscribe({
      next: () => {
        this.message.success('Post deleted.');
        this.loadAllPosts();
        this.loadMyPosts();
      },
      error: () => {
        this.message.error('Failed to delete post.');
      },
      complete: () => {
        this.deletingId = null;
      },
    });
  }

  canManage(post: PostResponse): boolean {
    return Boolean(post.owner);
  }

  handleLike(_: PostResponse) {
    this.message.info('Like feature is coming soon.');
  }

  handleComment(_: PostResponse) {
    this.message.info('Comment feature is coming soon.');
  }
}
