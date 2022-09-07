package projekat.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import projekat.models.Vrstatransporta;
import projekat.repository.VrstaTransportaRepository;

@Service
public class VrstaTransportaService {
	
	@Autowired
	private VrstaTransportaRepository vrstaTransportaRepository;
	
	public VrstaTransportaService(VrstaTransportaRepository vrstaTransportaRepository) {
		this.vrstaTransportaRepository = vrstaTransportaRepository;
	}

	public Collection<Vrstatransporta> getAll() {
		final var vrsteTransporta = vrstaTransportaRepository.findAll();
		return vrsteTransporta;
	}
	
	public Vrstatransporta getOne(Integer id) {
		final var vrstaTranporta = vrstaTransportaRepository.getById(id);
		return vrstaTranporta;
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	public Vrstatransporta insert(Vrstatransporta vrstatransporta) {
		Vrstatransporta inserted = vrstaTransportaRepository.save(vrstatransporta);
		return inserted;
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	public Vrstatransporta update(Vrstatransporta vrstatransporta) {
		Vrstatransporta updated = null;
		if (vrstaTransportaRepository.existsById(vrstatransporta.getVrstatransportaid())) {
			updated = vrstaTransportaRepository.save(vrstatransporta);
		}
		return updated;
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	public boolean delete(Integer id) {
		if(vrstaTransportaRepository.existsById(id))
			vrstaTransportaRepository.deleteById(id);
		return true;
	}

}
