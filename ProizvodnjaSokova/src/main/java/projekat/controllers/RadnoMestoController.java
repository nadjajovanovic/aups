package projekat.controllers;

import java.util.Collection;

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
import projekat.repository.RadnoMestoRepository;

@RestController
public class RadnoMestoController {

	@Autowired
	private RadnoMestoRepository radnoMestoRepository;
	
	public RadnoMestoController(RadnoMestoRepository radnoMestoRepository) {
		this.radnoMestoRepository = radnoMestoRepository;
	}
	
	@GetMapping("radno-mesto")
	public Collection<Radnomesto> getAllRadnaMesta() {
		return radnoMestoRepository.findAll();
	}
	
	@GetMapping("radno-mesto/{radnoMestoId}")
	public Radnomesto getRadnoMesto(@PathVariable Integer radnoMestoId) {
		return radnoMestoRepository.getById(radnoMestoId);
	}
	
	@CrossOrigin
	@PostMapping("radno-mesto")
	public ResponseEntity<Radnomesto> insertRadnoMesto(@RequestBody Radnomesto radnomesto) {
		radnoMestoRepository.save(radnomesto);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@PutMapping("radno-mesto/{radnoMestoId}")
	public ResponseEntity<Radnomesto> updateRadnoMesto(@RequestBody Radnomesto radnomesto) {
		if(radnoMestoRepository.existsById(radnomesto.getRadnomestoid()))
			radnoMestoRepository.save(radnomesto);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@DeleteMapping("radno-mesto/{radnoMestoId}")
	public ResponseEntity<Radnomesto> deleteRadnoMesto(@PathVariable Integer radnoMestoId) {
		if(radnoMestoRepository.existsById(radnoMestoId))
			radnoMestoRepository.deleteById(radnoMestoId);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
