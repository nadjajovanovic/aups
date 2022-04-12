package projekat.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import projekat.models.Pogon;
import projekat.repository.PogonRepository;

@Service
public class PogonService {
	
	@Autowired
	private PogonRepository pogonRepository;
	
	public PogonService(PogonRepository pogonRepository) {
		this.pogonRepository = pogonRepository;
	}

	public Collection<Pogon> getAll() {
		final var pogoni = pogonRepository.findAll();
		return pogoni;
	}
	
	public Pogon getOne(Integer id) {
		final var pogon = pogonRepository.getById(id);
		return pogon;
	}
	
	public Pogon insert(Pogon pogon) {
		Pogon inserted = pogonRepository.save(pogon);
		return inserted;
	}
	
	public Pogon update(Pogon pogon) {
		Pogon updated = pogonRepository.save(pogon);
		if (pogonRepository.existsById(pogon.getPogonid())) {
			updated = pogonRepository.save(pogon);
		}
		return updated;
	}
	
	public boolean delete(Integer id) {
		if(pogonRepository.existsById(id))
			pogonRepository.deleteById(id);
		return true;
	}

}
