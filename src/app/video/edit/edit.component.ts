import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IClip from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less'],
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() activeClip: IClip | null = null;
  clipID = new FormControl('');

  title = new FormControl('', [Validators.required, Validators.minLength(3)]);
  editForm = new FormGroup({
    title: this.title,
    id: this.clipID,
  });
  alertColor = 'blue';
  alertMsg = 'Please wait! Updating clip';
  showAlert = false;
  inSubmission = false;
  @Output() update = new EventEmitter();
  constructor(private modal: ModalService, private clipService: ClipService) {}

  ngOnInit(): void {
    this.modal.register('editClip');
  }

  ngOnDestroy() {
    this.modal.unRegister('editClip');
  }
  ngOnChanges() {
    if (!this.activeClip) {
      return;
    }
    this.inSubmission = false;
    this.showAlert = false;

    this.title.setValue(this.activeClip.title);
    this.clipID.setValue(this.activeClip.docID as string);
  }

  async editClip() {
    if (!this.activeClip) {
      return;
    }

    this.showAlert = true;
    this.inSubmission = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait! Updating clip';
    try {
      await this.clipService.updateClip(
        this.clipID.value as string,
        this.title.value as string
      );
    } catch (error) {
      this.inSubmission = true;
      this.alertColor = 'red';
      this.alertMsg = 'Upload failed';
      return;
    }

    this.activeClip.title = this.title.value as string;
    this.update.emit(this.activeClip);
    this.inSubmission = false;
    this.alertColor = 'green';
    this.alertMsg = 'Success';
  }
}
