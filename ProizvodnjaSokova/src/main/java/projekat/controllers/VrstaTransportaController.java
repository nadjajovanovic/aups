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
import projekat.services.VrstaTransportaService;

@RestController
public class VrstaTransportaController {
	
	@Autowired
	private VrstaTransportaService vrstaTransportaService;
	
	public VrstaTransportaController(VrstaTransportaService vrstaTransportaService) {
		this.vrstaTransportaService = vrstaTransportaService;
	}
	
	@GetMapping("vrsta-transporta")
	public Collection<Vrstatransporta> getAllVrstaTransporta() {
		final var vrsteTrasnporta = vrstaTransportaService.getAll();
		final var listaVrstaTransporta = vrsteTrasnporta.stream().toList();
		return listaVrstaTransporta;
	}
	
	@GetMapping("vrsta-transporta/{vrstaTransportaId}")
	public Vrstatransporta getVrstaTransporta(@PathVariable Integer vrstaTransportaId) {
		final var oneVrstaTransporta = vrstaTransportaService.getOne(vrstaTransportaId);
		return oneVrstaTransporta;
	}
	
	@CrossOrigin
	@PostMapping("vrsta-transporta")
	public ResponseEntity<Vrstatransporta> insertVrstaTransporta(@RequestBody Vrstatransporta vrstatransporta) {
		vrstaTransportaService.insert(vrstatransporta);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@PutMapping("vrsta-transporta/{vrstaTransportaId}")
	public ResponseEntity<Vrstatransporta> updateVrstaTransporta(@RequestBody Vrstatransporta vrstatransporta) {
		vrstaTransportaService.update(vrstatransporta);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@DeleteMapping("vrsta-transporta/{vrstaTransportaId}")
	public ResponseEntity<Vrstatransporta> deletePogon(@PathVariable Integer vrstaTransportaId) {
		vrstaTransportaService.delete(vrstaTransportaId);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
