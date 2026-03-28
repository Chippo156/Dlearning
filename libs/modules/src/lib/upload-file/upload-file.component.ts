import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NzUploadChangeParam,
  NzUploadFile,
  NzUploadModule,
} from 'ng-zorro-antd/upload';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  standalone: true,
  imports: [CommonModule, NzUploadModule, NzButtonModule, NzIconModule],
})
export class UploadFileComponent {
  @Output() updateAvatar = new EventEmitter<File>();

  fileList: NzUploadFile[] = [];
  previewImage = '';
  selectedFile: File | null = null;

  beforeUpload = (file: NzUploadFile): boolean => {
    const selected = this.getOriginFile(file);
    if (!selected) {
      return false;
    }

    this.selectedFile = selected;
    this.fileList = [file];
    void this.setPreview(selected);
    return false;
  };

  async handleChange(info: NzUploadChangeParam): Promise<void> {
    this.fileList = info.fileList.slice(-1);
  }

  handleRemove(): void {
    this.fileList = [];
    this.previewImage = '';
    this.selectedFile = null;
  }

  handleUpload(): void {
    if (!this.selectedFile) {
      return;
    }
    this.updateAvatar.emit(this.selectedFile);
  }

  private async setPreview(file: File): Promise<void> {
    this.previewImage = await this.toBase64(file);
  }

  private getOriginFile(file: NzUploadFile): File | null {
    const originFile = file.originFileObj as File | undefined;
    if (originFile instanceof File) {
      return originFile;
    }

    const fallbackFile = file as unknown as File;
    return fallbackFile instanceof File ? fallbackFile : null;
  }

  private toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }
}
