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

import projekat.models.Mesto;
import projekat.repository.MestoRepository;

@CrossOrigin
@RestController
public class MestoController {
	
	@Autowired
	private MestoRepository mestoRepository;
	
	public MestoController(MestoRepository mestoRepository) {
		this.mestoRepository = mestoRepository;
	}
	
	@GetMapping("mesto")
	public Collection<Mesto> getAllMesta() {
		return mestoRepository.findAll();
	}
	
	@GetMapping("mesto/{mestoid}")
	public Mesto getMesto(@PathVariable Integer mestoid) {
		return mestoRepository.getById(mestoid);
	}
	
	@CrossOrigin
	@PostMapping("mesto")
	public ResponseEntity<Mesto> insertMesto(@RequestBody Mesto mesto) {
		mestoRepository.save(mesto);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@PutMapping("mesto/{mestoid}")
	public ResponseEntity<Mesto> updateMesto(@RequestBody Mesto mesto) {
		if(mestoRepository.existsById(mesto.getMestoid()))
			mestoRepository.save(mesto);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@DeleteMapping("category/{categoryid}")
	public ResponseEntity<Mesto> deleteCategory(@PathVariable Integer mestoid) {
		if(mestoRepository.existsById(mestoid))
			mestoRepository.deleteById(mestoid);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
