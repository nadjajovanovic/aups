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
import projekat.repository.TransportRepository;

@RestController
public class TrasnportController {
	
	@Autowired
	private TransportRepository transportRepository;
	
	public TrasnportController(TransportRepository transportRepository) {
		this.transportRepository = transportRepository;
	}
	
	@GetMapping("transport")
	public Collection<Transport> getAllTransport() {
		return transportRepository.findAll();
	}
	
	@GetMapping("transport/{transportid}")
	public Transport getTransport(@PathVariable Integer transportid) {
		return transportRepository.getById(transportid);
	}
	
	@CrossOrigin
	@PostMapping("transport")
	public ResponseEntity<Transport> insertTransport(@RequestBody Transport transport) {
		transportRepository.save(transport);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@PutMapping("transport/{transportid}")
	public ResponseEntity<Transport> updateTransport(@RequestBody Transport transport) {
		if(transportRepository.existsById(transport.getTransportid()))
			transportRepository.save(transport);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@DeleteMapping("transport/{transportid}")
	public ResponseEntity<Transport> deleteTransport(@PathVariable Integer transportid) {
		if(transportRepository.existsById(transportid))
			transportRepository.deleteById(transportid);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
