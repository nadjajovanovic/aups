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

import projekat.models.Transport;
import projekat.services.TransportService;

@RestController
public class TransportController {
	
	@Autowired
	private TransportService transportService;
	
	public TransportController(TransportService transportService) {
		this.transportService = transportService;
	}
	
	@GetMapping("transport")
	public Collection<Transport> getAllTransport() {
		final var trasnporti = transportService.getAll();
		final var listaTransporta = trasnporti.stream().toList();
		return listaTransporta;
	}
	
	@GetMapping("transport/{transportid}")
	public Transport getTransport(@PathVariable Integer transportid) {
		final var oneTransport = transportService.getOne(transportid);
		return oneTransport;
	}
	
	@CrossOrigin
	@PostMapping("transport")
	public ResponseEntity<Transport> insertTransport(@RequestBody Transport transport) {
		transportService.insert(transport);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@PutMapping("transport/{transportid}")
	public ResponseEntity<Transport> updateTransport(@RequestBody Transport transport) {
		transportService.update(transport);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@DeleteMapping("transport/{transportid}")
	public ResponseEntity<Transport> deleteTransport(@PathVariable Integer transportid) {
		transportService.delete(transportid);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
