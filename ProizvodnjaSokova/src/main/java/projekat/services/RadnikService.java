package projekat.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import projekat.models.Radnik;
import projekat.repository.RadnikRepository;

@Service
public class RadnikService {

	@Autowired
	private RadnikRepository radnikRepository;
	
	public RadnikService(RadnikRepository radnikRepository) {
		this.radnikRepository = radnikRepository;
	}

	public Collection<Radnik> getAll() {
		final var radnici = radnikRepository.findAll();
		return radnici;
	}
	
	public Radnik getOne(Integer id) {
		final var radnik = radnikRepository.getById(id);
		return radnik;
	}
	
	public Radnik insert(Radnik radnik) {
		Radnik inserted = radnikRepository.save(radnik);
		return inserted;
	}
	
	public Radnik update(Radnik radnik) {
		Radnik updated = null;
		if (radnikRepository.existsById(radnik.getRadnikid())) {
			updated = radnikRepository.save(radnik);
		}
		return updated;
	}
	
	public boolean delete(Integer id) {
		if(radnikRepository.existsById(id))
			radnikRepository.deleteById(id);
		return true;
	}
}
