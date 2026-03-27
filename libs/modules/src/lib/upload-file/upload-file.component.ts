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

  beforeUpload = () => false;

  async handleChange(info: NzUploadChangeParam): Promise<void> {
    const latestList = info.fileList.slice(-1);
    this.fileList = latestList;

    const latestFile = latestList[0];
    const originFile = latestFile?.originFileObj as File | undefined;
    if (!originFile) {
      return;
    }

    this.selectedFile = originFile;
    this.previewImage = await this.toBase64(originFile);
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

  private toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }
}
