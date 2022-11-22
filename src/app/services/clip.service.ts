import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestoreCollection,
  AngularFirestore,
  DocumentReference,
  QuerySnapshot,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map, of, switchMap } from 'rxjs';
import IClip from '../models/clip.model';
@Injectable({
  providedIn: 'root',
})
export class ClipService {
  public clipCollection: AngularFirestoreCollection<IClip>;
  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private storage: AngularFireStorage
  ) {
    this.clipCollection = db.collection('clips');
  }

  createClip(data: IClip): Promise<DocumentReference<IClip>> {
    return this.clipCollection.add(data);
  }

  getUserClips() {
    return this.auth.user.pipe(
      switchMap((user) => {
        if (!user) {
          return of([]);
        }
        const query = this.clipCollection.ref.where('uid', '==', user.uid);
        return query.get();
      }),
      map((snapshot) => (snapshot as QuerySnapshot<IClip>).docs)
    );
  }
  updateClip(id: string, title: string) {
    console.log(title);
    return this.clipCollection.doc(id).update({
      title,
    });
  }
  async deleteClip(clip: IClip) {
    const clipRef = this.storage.ref(`clips/${clip.fileName}`);
    await clipRef.delete();

    await this.clipCollection.doc(clip.docID).delete();
  }
}
