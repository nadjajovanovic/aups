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

import projekat.models.Vrstatransporta;
import projekat.repository.VrstaTransportaRepository;

@RestController
public class VrstaTransportaController {
	
	@Autowired
	private VrstaTransportaRepository vrstaTransportaRepository;
	
	public VrstaTransportaController(VrstaTransportaRepository vrstaTransportaRepository) {
		this.vrstaTransportaRepository = vrstaTransportaRepository;
	}
	
	@GetMapping("vrsta-transporta")
	public Collection<Vrstatransporta> getAllVrstaTransporta() {
		return vrstaTransportaRepository.findAll();
	}
	
	@GetMapping("vrsta-transporta/{vrstaTransportaId}")
	public Vrstatransporta getVrstaTransporta(@PathVariable Integer vrstaTransportaId) {
		return vrstaTransportaRepository.getById(vrstaTransportaId);
	}
	
	@CrossOrigin
	@PostMapping("vrsta-transporta")
	public ResponseEntity<Vrstatransporta> insertVrstaTransporta(@RequestBody Vrstatransporta vrstatransporta) {
		vrstaTransportaRepository.save(vrstatransporta);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@PutMapping("vrsta-transporta/{vrstaTransportaId}")
	public ResponseEntity<Vrstatransporta> updateVrstaTransporta(@RequestBody Vrstatransporta vrstatransporta) {
		if(vrstaTransportaRepository.existsById(vrstatransporta.getVrstatransportaid()))
			vrstaTransportaRepository.save(vrstatransporta);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@DeleteMapping("vrsta-transporta/{vrstaTransportaId}")
	public ResponseEntity<Vrstatransporta> deletePogon(@PathVariable Integer vrstaTransportaId) {
		if(vrstaTransportaRepository.existsById(vrstaTransportaId))
			vrstaTransportaRepository.deleteById(vrstaTransportaId);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
