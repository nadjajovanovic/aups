package projekat.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import projekat.models.Skladiste;
import projekat.repository.SkladisteRepository;

@Service
public class SkladisteService {
	
	@Autowired
	private SkladisteRepository skladisteRepository;
	
	public SkladisteService(SkladisteRepository skladisteRepository) {
		this.skladisteRepository = skladisteRepository;
	}

	public Collection<Skladiste> getAll() {
		final var skladista = skladisteRepository.findAll();
		return skladista;
	}
	
	public Skladiste getOne(Integer id) {
		final var skladiste = skladisteRepository.getById(id);
		return skladiste;
	}
	
	//@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public Skladiste insert(Skladiste skladiste) {
		Skladiste inserted = skladisteRepository.save(skladiste);
		return inserted;
	}
	
	//@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public Skladiste update(Skladiste skladiste) {
		Skladiste updated = null;
		if (skladisteRepository.existsById(skladiste.getSkladisteid())) {
			updated = skladisteRepository.save(skladiste);
		}
		return updated;
	}
	
	//@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public boolean delete(Integer id) {
		if(skladisteRepository.existsById(id))
			skladisteRepository.deleteById(id);
		return true;
	}

}
