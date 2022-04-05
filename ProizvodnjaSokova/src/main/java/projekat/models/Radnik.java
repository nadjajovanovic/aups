package projekat.models;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;


/**
 * The persistent class for the radnik database table.
 * 
 */
@Entity
@NamedQuery(name="Radnik.findAll", query="SELECT r FROM Radnik r")
public class Radnik implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="RADNIK_RADNIKID_GENERATOR", sequenceName="RADNIK_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="RADNIK_RADNIKID_GENERATOR")
	private Integer radnikid;

	private String ime;

	private String jmbg;

	private String password;

	private String prezime;

	private String username;

	//bi-directional many-to-one association to Planproizvodnje
	@JsonIgnore
	@OneToMany(mappedBy="radnik")
	private List<Planproizvodnje> planproizvodnjes;

	//bi-directional many-to-one association to Pogon
	@ManyToOne
	@JoinColumn(name="pogonid")
	private Pogon pogon;

	//bi-directional many-to-one association to Radnomesto
	@ManyToOne
	@JoinColumn(name="radnomestoid")
	private Radnomesto radnomesto;

	//bi-directional many-to-one association to Skladiste
	@OneToMany(mappedBy="radnik")
	private List<Skladiste> skladistes;

	public Radnik() {
	}

	public Integer getRadnikid() {
		return this.radnikid;
	}

	public void setRadnikid(Integer radnikid) {
		this.radnikid = radnikid;
	}

	public String getIme() {
		return this.ime;
	}

	public void setIme(String ime) {
		this.ime = ime;
	}

	public String getJmbg() {
		return this.jmbg;
	}

	public void setJmbg(String jmbg) {
		this.jmbg = jmbg;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPrezime() {
		return this.prezime;
	}

	public void setPrezime(String prezime) {
		this.prezime = prezime;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<Planproizvodnje> getPlanproizvodnjes() {
		return this.planproizvodnjes;
	}

	public void setPlanproizvodnjes(List<Planproizvodnje> planproizvodnjes) {
		this.planproizvodnjes = planproizvodnjes;
	}

	public Planproizvodnje addPlanproizvodnje(Planproizvodnje planproizvodnje) {
		getPlanproizvodnjes().add(planproizvodnje);
		planproizvodnje.setRadnik(this);

		return planproizvodnje;
	}

	public Planproizvodnje removePlanproizvodnje(Planproizvodnje planproizvodnje) {
		getPlanproizvodnjes().remove(planproizvodnje);
		planproizvodnje.setRadnik(null);

		return planproizvodnje;
	}

	public Pogon getPogon() {
		return this.pogon;
	}

	public void setPogon(Pogon pogon) {
		this.pogon = pogon;
	}

	public Radnomesto getRadnomesto() {
		return this.radnomesto;
	}

	public void setRadnomesto(Radnomesto radnomesto) {
		this.radnomesto = radnomesto;
	}

	public List<Skladiste> getSkladistes() {
		return this.skladistes;
	}

	public void setSkladistes(List<Skladiste> skladistes) {
		this.skladistes = skladistes;
	}

	public Skladiste addSkladiste(Skladiste skladiste) {
		getSkladistes().add(skladiste);
		skladiste.setRadnik(this);

		return skladiste;
	}

	public Skladiste removeSkladiste(Skladiste skladiste) {
		getSkladistes().remove(skladiste);
		skladiste.setRadnik(null);

		return skladiste;
	}

}