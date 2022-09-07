package projekat.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import projekat.models.Transport;
import projekat.repository.TransportRepository;

@Service
public class TransportService {
	
	@Autowired
	private TransportRepository transportRepository;
	
	public TransportService(TransportRepository transportRepository) {
		this.transportRepository = transportRepository;
	}

	public Collection<Transport> getAll() {
		final var transporti = transportRepository.findAll();
		return transporti;
	}
	
	public Transport getOne(Integer id) {
		final var transport = transportRepository.getById(id);
		return transport;
	}
	
	//@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public Transport insert(Transport transport) {
		Transport inserted = transportRepository.save(transport);
		return inserted;
	}
	
	//@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public Transport update(Transport transport) {
		Transport updated = null;
		if (transportRepository.existsById(transport.getTransportid())) {
			updated = transportRepository.save(transport);
		}
		return updated;
	}
	
	//@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public boolean delete(Integer id) {
		if(transportRepository.existsById(id))
			transportRepository.deleteById(id);
		return true;
	}

}
