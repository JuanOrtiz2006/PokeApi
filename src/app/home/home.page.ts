// Importa el servicio APIServiceService y el decorador Component desde los módulos de Angular.
import { DomController } from '@ionic/angular';
import { APIServiceService } from './../Services/apiservice.service';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// Define el componente HomePage con su selector, plantilla y estilos.
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

    // Constructor del componente que recibe una instancia del servicio APIServiceService.
  constructor(private api: APIServiceService, private sanitizer: DomSanitizer) {}

  pokemonNombre!: string;
  pokemonID!: number;
  pokemonImagen: any;


  // Método para obtener datos de un Pokémon dado su ID.
  getPokemonDataID(id: number) {

    try {
      // Llama al método getPokemon del servicio y se suscribe al observable.
      this.api.getPokemonID(id).subscribe((response => {

        this.pokemonNombre = response.name;
        const imgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + this.pokemonID + '.png';
    
        // Sanitizar URL 
        this.pokemonImagen = this.sanitizer.bypassSecurityTrustUrl(imgUrl);


      }));
    } catch (error) {
      // Captura cualquier error que pueda ocurrir durante la suscripción y lo imprime en la consola.
      console.log(error);
    }
  }

  getPokemonDataName(name: string) {
    try {
      // Llama al método getPokemon del servicio y se suscribe al observable.
      this.api.getPokemonName(name).subscribe((response => {

        this.pokemonID = response.id;

        const imgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + this.pokemonID + '.png';
    
        // Sanitizar URL 
        this.pokemonImagen = this.sanitizer.bypassSecurityTrustUrl(imgUrl);

        
      }));
    } catch (error) {
      // Captura cualquier error que pueda ocurrir durante la suscripción y lo imprime en la consola.
      console.log(error);
    }
  }


}
