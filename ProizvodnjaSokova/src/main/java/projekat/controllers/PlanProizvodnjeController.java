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
import projekat.services.PlanProizvodnjeService;

@RestController
public class PlanProizvodnjeController {
	
	@Autowired
	private PlanProizvodnjeService planProizvodnjeService;
	
	public PlanProizvodnjeController(PlanProizvodnjeService planProizvodnjeService) {
		this.planProizvodnjeService = planProizvodnjeService;
	}
	
	@GetMapping("plan-proizvodnje")
	public Collection<Planproizvodnje> getAllPlanaProizvodnje() {
		final var planProizvodnje = planProizvodnjeService.getAll();
		final var listaPlanaProizvodnje = planProizvodnje.stream().toList();
		return listaPlanaProizvodnje;
	}
	
	@GetMapping("plan-proizvodnje/{planProizvodnjeId}")
	public Planproizvodnje getPlanProizvodnje(@PathVariable Integer planProizvodnjeId) {
		final var onePlanProizvodnje = planProizvodnjeService.getOne(planProizvodnjeId);
		return onePlanProizvodnje;
	}
	
	@CrossOrigin
	@PostMapping("plan-proizvodnje")
	public ResponseEntity<Planproizvodnje> insertPlanProizvodnje(@RequestBody Planproizvodnje planProizvodnje) {
		planProizvodnjeService.insert(planProizvodnje);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@PutMapping("plan-proizvodnje/{planProizvodnjeId}")
	public ResponseEntity<Planproizvodnje> updatePlanProizvodnje(@RequestBody Planproizvodnje planProizvodnje) {
		planProizvodnjeService.update(planProizvodnje);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@CrossOrigin
	@DeleteMapping("plan-proizvodnje/{planProizvodnjeId}")
	public ResponseEntity<Planproizvodnje> deletePlanProizvodnje(@PathVariable Integer planProizvodnjeId) {
		planProizvodnjeService.delete(planProizvodnjeId);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
