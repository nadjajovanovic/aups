package projekat.controllers;

import java.util.Collection;
import java.util.Comparator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import projekat.models.Radnomesto;
import projekat.services.RadnoMestoService;

@RestController
public class RadnoMestoController {

	@Autowired
	private RadnoMestoService radnoMestoService;
	
	public RadnoMestoController(RadnoMestoService radnoMestoService) {
		this.radnoMestoService = radnoMestoService;
	}
	
	@GetMapping("radno-mesto")
	public Collection<Radnomesto> getAllRadnaMesta() {
		final var radnaMesta = radnoMestoService.getAll();
		final var listaRadnihMesta = radnaMesta.stream().sorted(Comparator.comparingInt(Radnomesto::getRadnomestoid)).toList();
		return listaRadnihMesta;
	}
	
	@GetMapping("radno-mesto/{radnoMestoId}")
	public Radnomesto getRadnoMesto(@PathVariable Integer radnoMestoId) {
		final var oneRadnoMesto = radnoMestoService.getOne(radnoMestoId);
		return oneRadnoMesto;
	}
	
	@CrossOrigin
	@PostMapping("radno-mesto")
	public ResponseEntity<Radnomesto> insertRadnoMesto(@RequestBody Radnomesto radnomesto) {
		radnoMestoService.insert(radnomesto);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@PutMapping("radno-mesto")
	public ResponseEntity<Radnomesto> updateRadnoMesto(@RequestBody Radnomesto radnomesto) {
		radnoMestoService.update(radnomesto);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@DeleteMapping("radno-mesto/{radnoMestoId}")
	public ResponseEntity<Radnomesto> deleteRadnoMesto(@PathVariable Integer radnoMestoId) {
		radnoMestoService.delete(radnoMestoId);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
