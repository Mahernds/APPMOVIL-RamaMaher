<<<<<<< HEAD
import { Component, ViewChild, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { GmapsService } from '../services/gmaps/gmaps.service';
import { ActionSheetController } from '@ionic/angular';
=======
import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { Geolocation } from '@capacitor/geolocation';
>>>>>>> 03623c9 (Primer commit)

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
<<<<<<< HEAD
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


=======
export class HomePage implements OnInit {
  public map!: mapboxgl.Map;
  public style = 'mapbox://styles/mapbox/streets-v11';
  public markers: mapboxgl.Marker[] = []; // Lista de marcadores

  constructor() {}

  ngOnInit() {
    this.obtenerUbicacion();
  }

  ionViewWillEnter() {
    if (!this.map) {
      this.buildMap();
    }
  }

  async obtenerUbicacion() {
    try {
      const coordenadas = await Geolocation.getCurrentPosition();
      console.log('Latitud ', coordenadas.coords.latitude);
      console.log('Longitud ', coordenadas.coords.longitude);
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  }

  async buildMap() {
    const coordenadas = await Geolocation.getCurrentPosition();
    mapboxgl.accessToken = 'pk.eyJ1IjoibWtvbWluLTkzIiwiYSI6ImNtMmtra2twNzAyYTUyam40MHJ4ZWxndXMifQ.XUUZ8mOqe4ylOSoFvKZDHQ';

    this.map = new mapboxgl.Map({
      container: 'mapa-box',
      style: this.style,
      zoom: 14,
      center: [coordenadas.coords.longitude, coordenadas.coords.latitude],
    });

    this.map.on('click', (event) => {
      const { lng, lat } = event.lngLat;
      this.addMarker(lng, lat); // Agrega un marcador al hacer clic en el mapa
    });

    this.map.resize();
  }

  // Método para agregar un marcador
  addMarker(lng: number, lat: number) {
    const marker = new mapboxgl.Marker()
      .setLngLat([lng, lat]) // Coordenadas del marcador
      .addTo(this.map); // Añade el marcador al mapa

    this.markers.push(marker); // Lo guarda en la lista de marcadores

    // Permitir eliminar el marcador al hacer clic en él
    marker.getElement().addEventListener('click', () => {
      this.removeMarker(marker);
    });
  }

  // Método para eliminar un marcador
  removeMarker(marker: mapboxgl.Marker) {
    marker.remove(); // Elimina el marcador del mapa
    this.markers = this.markers.filter((m) => m !== marker); // Lo elimina de la lista de marcadores
  }
>>>>>>> 03623c9 (Primer commit)
}
