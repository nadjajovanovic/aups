package projekat.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import projekat.models.Planproizvodnje;
import projekat.repository.PlanProizvodnjeRepository;

@Service
public class PlanProizvodnjeService {
	
	@Autowired
	private PlanProizvodnjeRepository planProizvodnjeRepository;
	
	public PlanProizvodnjeService(PlanProizvodnjeRepository planProizvodnjeRepository) {
		this.planProizvodnjeRepository = planProizvodnjeRepository;
	}

	public Collection<Planproizvodnje> getAll() {
		final var planProizvodnje = planProizvodnjeRepository.findAll();
		return planProizvodnje;
	}
	
	public Planproizvodnje getOne(Integer id) {
		final var planProizvodnje = planProizvodnjeRepository.getById(id);
		return planProizvodnje;
	}
	
	//@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public Planproizvodnje insert(Planproizvodnje planproizvodnje) {
		Planproizvodnje inserted = planProizvodnjeRepository.save(planproizvodnje);
		return inserted;
	}
	
	//@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public Planproizvodnje update(Planproizvodnje planproizvodnje) {
		Planproizvodnje updated = null;
		if (planProizvodnjeRepository.existsById(planproizvodnje.getPlanproizvodnjeid())) {
			updated = planProizvodnjeRepository.save(planproizvodnje);
		}
		return updated;
	}
	
	//@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public boolean delete(Integer id) {
		if(planProizvodnjeRepository.existsById(id))
			planProizvodnjeRepository.deleteById(id);
		return true;
	}

}
