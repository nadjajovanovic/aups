package projekat.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import projekat.models.Sastojci;
import projekat.repository.SastojciRepository;

@Service
public class SastojciService {
	
	@Autowired
	private SastojciRepository sastojciRepository;
	
	public SastojciService(SastojciRepository sastojciRepository) {
		this.sastojciRepository = sastojciRepository;
	}

	public Collection<Sastojci> getAll() {
		final var sastojci = sastojciRepository.findAll();
		return sastojci;
	}
	
	public Sastojci getOne(Integer id) {
		final var sastojak = sastojciRepository.getById(id);
		return sastojak;
	}
	
	public Sastojci insert(Sastojci sastojci) {
		Sastojci inserted = sastojciRepository.save(sastojci);
		return inserted;
	}
	
	public Sastojci update(Sastojci sastojci) {
		Sastojci updated = null;
		if (sastojciRepository.existsById(sastojci.getSastojciid())) {
			updated = sastojciRepository.save(sastojci);
		}
		return updated;
	}
	
	public boolean delete(Integer id) {
		if(sastojciRepository.existsById(id))
			sastojciRepository.deleteById(id);
		return true;
	}

}
