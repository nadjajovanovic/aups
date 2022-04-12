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

import projekat.models.Mesto;
import projekat.services.MestoService;

@RestController
public class MestoController {
	
	@Autowired
	private MestoService mestoService;
	
	
	public MestoController(MestoService mestoService) {
		this.mestoService = mestoService;
	}
	
	@GetMapping("mesto")
	public Collection<Mesto> getAllMesta() {
		final var mesta = mestoService.getAll();
		final var listaMesta = mesta.stream().sorted(Comparator.comparingInt(Mesto::getMestoid)).toList();
		return listaMesta;
	}

	@GetMapping("mesto/{mestoid}")
	public Mesto getMesto(@PathVariable Integer mestoid) {
		final var oneMesto = mestoService.getOne(mestoid);
		return oneMesto;
	}
	
	@CrossOrigin
	@PostMapping("mesto")
	public ResponseEntity<Mesto> insertMesto(@RequestBody Mesto mesto) {
		mestoService.insert(mesto);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@PutMapping("mesto/{mestoid}")
	public ResponseEntity<Mesto> updateMesto(@RequestBody Mesto mesto) {
		mestoService.update(mesto);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@DeleteMapping("mesto/{mestoid}")
	public ResponseEntity<Mesto> deleteMesto(@PathVariable Integer mestoid) {
		mestoService.delete(mestoid);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
