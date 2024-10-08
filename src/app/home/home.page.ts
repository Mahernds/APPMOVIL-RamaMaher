import { Component, ViewChild, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { GmapsService } from '../services/gmaps/gmaps.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy{

  @ViewChild('map', { static: true })
  mapElementRef!: ElementRef;
  googleMaps: any;
  center = { lat: 28.649944693035188, lng: 77.23961776224988};
  map: any;
  mapClickListener: any; 
  markerClickListener: any;
  markers: any[] = [];

  constructor(
    private gmaps: GmapsService,
    private renderer: Renderer2,
    private actionSheetCtrl: ActionSheetController,
  ) {}
  
  ngOnInit(): void { 
  }

  ngAfterViewInit(){
    this.loadMap();
  }


  async loadMap() {
    try {
      let googleMaps: any = await this.gmaps.loadGoogleMaps();
      this.googleMaps = googleMaps;
      const mapEl = this.mapElementRef.nativeElement;
      const location = new googleMaps.latLng(this.center.lat, this.center.lng);
      this.map = new googleMaps.Map(mapEl,{
        center: location,
        zoom: 12
      });
      this.renderer.addClass(mapEl, 'visible');
      this.addMarker(location);
      this.onMapClick();
    }catch(e) {
      console.log(e);
    }  
  }

  onMapClick(){
    this.mapClickListener= this.googleMaps.event.addListener(this.map, "click", (mapsMouseEvent: { latLng: { toJSON: () => any; }; }) => {
      console.log(mapsMouseEvent.latLng.toJSON());
      this.addMarker(mapsMouseEvent.latLng);
    });
  }



  addMarker(location: any) {
    let googleMaps: any = this.googleMaps;
    const icon = {
      url: 'assets/icon/Icon.webp',
      scaledSize: new googleMaps.Size(50, 50),
    }; 
      const marker = new googleMaps.Marker({
        position: location,
        map: this.map,
        icon: icon,
        //draggable: true,
        animation: googleMaps.animation.DROP
      });
      this.markers.push(marker);
      this.presentActionSheet();
      this.markerClickListener = this.googleMaps.event.addListener(marker, 'click', () => {
        console.log('markerclick', marker);

        this.checkAndRemoveMarker(marker);
        console.log('markers: ', this.markers);
      })
    }
  
    checkAndRemoveMarker(marker: { position: { lat: () => any; lng: () => any; }; }) {
      const index = this.markers.findIndex(x => x.position.lat() == marker.position.lat() && x.position.lng() == marker.position.lng());
      console.log('is marker already: ', index);
      if(index >= 0) {
        this.markers[index].setMap(null);
        this.markers.splice(index, 1);
        return;
      }
    }

    async presentActionSheet() {
      const actionSheet = await this.actionSheetCtrl.create({
        header: 'Added Marker',
        subHeader: '',
        buttons: [
          {
            text: 'Remove',
            role: 'destructive',
            data: {
              action: 'delete',
            },
          },
          {
            text: 'Save',
            data: {
              action: 'save',
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
            data: {
              action: 'cancel',
            },
          },
        ],
      });
      await actionSheet.present();
    }

    ngOnDestroy() {
      //this.googleMaps.event.removeAllListeners();
      if(this.mapClickListener) this.googleMaps.event.removeListener(this.mapClickListener);
      if(this.markerClickListener) this.googleMaps.event.removeListeners(this.markerClickListener);
    }


}
