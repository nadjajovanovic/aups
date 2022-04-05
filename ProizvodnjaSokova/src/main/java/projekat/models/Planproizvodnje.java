package projekat.models;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;


/**
 * The persistent class for the planproizvodnje database table.
 * 
 */
@Entity
@NamedQuery(name="Planproizvodnje.findAll", query="SELECT p FROM Planproizvodnje p")
public class Planproizvodnje implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="PLANPROIZVODNJE_PLANPROIZVODNJEID_GENERATOR", sequenceName="PLAN_PROIZVODNJE_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="PLANPROIZVODNJE_PLANPROIZVODNJEID_GENERATOR")
	private Integer planproizvodnjeid;

	@Temporal(TemporalType.DATE)
	private Date datum;

	private BigDecimal kolicina;

	private String napomena;

	private String oznakapp;

	//bi-directional many-to-one association to Radnik
	@ManyToOne
	@JoinColumn(name="radnikid")
	private Radnik radnik;

	//bi-directional many-to-one association to Transport
	@ManyToOne
	@JoinColumn(name="transportid")
	private Transport transport;

	//bi-directional many-to-one association to Proizvod
	@JsonIgnore
	@OneToMany(mappedBy="planproizvodnje")
	private List<Proizvod> proizvods;

	public Planproizvodnje() {
	}

	public Integer getPlanproizvodnjeid() {
		return this.planproizvodnjeid;
	}

	public void setPlanproizvodnjeid(Integer planproizvodnjeid) {
		this.planproizvodnjeid = planproizvodnjeid;
	}

	public Date getDatum() {
		return this.datum;
	}

	public void setDatum(Date datum) {
		this.datum = datum;
	}

	public BigDecimal getKolicina() {
		return this.kolicina;
	}

	public void setKolicina(BigDecimal kolicina) {
		this.kolicina = kolicina;
	}

	public String getNapomena() {
		return this.napomena;
	}

	public void setNapomena(String napomena) {
		this.napomena = napomena;
	}

	public String getOznakapp() {
		return this.oznakapp;
	}

	public void setOznakapp(String oznakapp) {
		this.oznakapp = oznakapp;
	}

	public Radnik getRadnik() {
		return this.radnik;
	}

	public void setRadnik(Radnik radnik) {
		this.radnik = radnik;
	}

	public Transport getTransport() {
		return this.transport;
	}

	public void setTransport(Transport transport) {
		this.transport = transport;
	}

	public List<Proizvod> getProizvods() {
		return this.proizvods;
	}

	public void setProizvods(List<Proizvod> proizvods) {
		this.proizvods = proizvods;
	}

	public Proizvod addProizvod(Proizvod proizvod) {
		getProizvods().add(proizvod);
		proizvod.setPlanproizvodnje(this);

		return proizvod;
	}

	public Proizvod removeProizvod(Proizvod proizvod) {
		getProizvods().remove(proizvod);
		proizvod.setPlanproizvodnje(null);

		return proizvod;
	}

}