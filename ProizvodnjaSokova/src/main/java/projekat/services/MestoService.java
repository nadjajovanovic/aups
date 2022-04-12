package projekat.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import projekat.models.Mesto;
import projekat.repository.MestoRepository;

@Service
public class MestoService {
	
	@Autowired
	private MestoRepository mestoRepository;
	
	public MestoService(MestoRepository mestoRepository) {
		this.mestoRepository = mestoRepository;
	}

	public Collection<Mesto> getAll() {
		final var mesta = mestoRepository.findAll();
		return mesta;
	}
	
	public Mesto getOne(Integer id) {
		final var mesto = mestoRepository.getById(id);
		return mesto;
	}
	
	public Mesto insert(Mesto mesto) {
		Mesto inserted = mestoRepository.save(mesto);
		return inserted;
	}
	
	public Mesto update(Mesto mesto) {
		Mesto updated = null;
		if (mestoRepository.existsById(mesto.getMestoid())) {
			updated = mestoRepository.save(mesto);
		}
		return updated;
	}
	
	public boolean delete(Integer id) {
		if(mestoRepository.existsById(id))
			mestoRepository.deleteById(id);
		return true;
	}
}
