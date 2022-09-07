package projekat.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import projekat.models.Radnomesto;
import projekat.repository.RadnoMestoRepository;

@Service
public class RadnoMestoService {
	
	@Autowired
	private RadnoMestoRepository radnoMestoRepository;
	
	public RadnoMestoService(RadnoMestoRepository radnoMestoRepository) {
		this.radnoMestoRepository = radnoMestoRepository;
	}

	public Collection<Radnomesto> getAll() {
		final var radnaMesta = radnoMestoRepository.findAll();
		return radnaMesta;
	}
	
	public Radnomesto getOne(Integer id) {
		final var radnoMesto = radnoMestoRepository.getById(id);
		return radnoMesto;
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	public Radnomesto insert(Radnomesto radnomesto) {
		Radnomesto inserted = radnoMestoRepository.save(radnomesto);
		return inserted;
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	public Radnomesto update(Radnomesto radnomesto) {
		Radnomesto updated = null;
		if (radnoMestoRepository.existsById(radnomesto.getRadnomestoid())) {
			updated = radnoMestoRepository.save(radnomesto);
		}
		return updated;
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	public boolean delete(Integer id) {
		if(radnoMestoRepository.existsById(id))
			radnoMestoRepository.deleteById(id);
		return true;
	}

}
