package projekat.controllers;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import projekat.models.Planproizvodnje;
import projekat.repository.PlanProizvodnjeRepository;

@RestController
public class PlanProizvodnjeController {
	
	@Autowired
	private PlanProizvodnjeRepository planProizvodnjeRepository;
	
	public PlanProizvodnjeController(PlanProizvodnjeRepository planProizvodnjeRepository) {
		this.planProizvodnjeRepository = planProizvodnjeRepository;
	}
	
	@GetMapping("plan-proizvodnje")
	public Collection<Planproizvodnje> getAllPlanaProizvodnje() {
		return planProizvodnjeRepository.findAll();
	}
	
	@GetMapping("plan-proizvodnje/{planProizvodnjeId}")
	public Planproizvodnje getPlanProizvodnje(@PathVariable Integer planProizvodnjeId) {
		return planProizvodnjeRepository.getById(planProizvodnjeId);
	}
	
	@CrossOrigin
	@PostMapping("plan-proizvodnje")
	public ResponseEntity<Planproizvodnje> insertPlanProizvodnje(@RequestBody Planproizvodnje planProizvodnje) {
		planProizvodnjeRepository.save(planProizvodnje);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@PutMapping("plan-proizvodnje/{planProizvodnjeId}")
	public ResponseEntity<Planproizvodnje> updatePlanProizvodnje(@RequestBody Planproizvodnje planProizvodnje) {
		if(planProizvodnjeRepository.existsById(planProizvodnje.getPlanproizvodnjeid()))
			planProizvodnjeRepository.save(planProizvodnje);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@DeleteMapping("plan-proizvodnje/{planProizvodnjeId}")
	public ResponseEntity<Planproizvodnje> deletePlanProizvodnje(@PathVariable Integer planProizvodnjeId) {
		if(planProizvodnjeRepository.existsById(planProizvodnjeId))
			planProizvodnjeRepository.deleteById(planProizvodnjeId);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
