package projekat.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import projekat.models.Proizvod;
import projekat.repository.ProizvodRepository;

@Service
public class ProizvodService {
	
	@Autowired
	private ProizvodRepository proizvodRepository;
	
	public ProizvodService(ProizvodRepository proizvodRepository) {
		this.proizvodRepository = proizvodRepository;
	}

	public Collection<Proizvod> getAll() {
		final var proizvodi = proizvodRepository.findAll();
		return proizvodi;
	}
	
	public Proizvod getOne(Integer id) {
		final var proizvod = proizvodRepository.getById(id);
		return proizvod;
	}
	
	//@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public Proizvod insert(Proizvod proizvod) {
		Proizvod inserted = proizvodRepository.save(proizvod);
		return inserted;
	}
	
	//@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public Proizvod update(Proizvod proizvod) {
		Proizvod updated = null;
		if (proizvodRepository.existsById(proizvod.getProizvodid())) {
			updated = proizvodRepository.save(proizvod);
		}
		return updated;
	}
	
	//@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public boolean delete(Integer id) {
		if(proizvodRepository.existsById(id))
			proizvodRepository.deleteById(id);
		return true;
	}
}
