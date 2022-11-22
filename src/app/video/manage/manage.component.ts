import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import IClip from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.less'],
})
export class ManageComponent implements OnInit {
  videoOrder = '1';
  clips: IClip[] = [];
  activeClip: IClip | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clipService: ClipService,
    private modal: ModalService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.videoOrder = params['sort'];
    });

    this.clipService.getUserClips().subscribe((docs) => {
      this.clips = [];
      docs.forEach((doc) => {
        this.clips.push({ docID: doc.id, ...doc.data() });
      });
    });
  }
  sort(event: Event) {
    const { value } = event.target as HTMLSelectElement;
    console.log(value);
    // this.router.navigateByUrl(`/manage?sort=${value}`);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sort: value,
      },
    });
  }

  openModal($event: Event, clip: IClip) {
    $event.preventDefault();
    this.activeClip = clip;
    this.modal.toggleModal('editClip');
  }
  update($event: IClip) {
    this.clips.forEach((clip, idx) => {
      if (clip.docID === $event.docID) {
        this.clips[idx].title = $event.title;
      }
    });
  }
  deleteClip($event: Event, clip: IClip) {
    $event.preventDefault();
    this.activeClip = clip;
    console.log(clip);
    this.clipService.deleteClip(clip);
    this.clips = this.clips.filter((e) => e.docID !== clip.docID);
    // this.clips.forEach((element, idx) => {
    //   if (clip.docID === element.docID) {
    //     this.clips.splice(idx, 1);
    //   }
    // });
    // this.modal.toggleModal('editClip');
  }
}
