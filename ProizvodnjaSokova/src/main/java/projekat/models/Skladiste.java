package projekat.models;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the skladiste database table.
 * 
 */
@Entity
@NamedQuery(name="Skladiste.findAll", query="SELECT s FROM Skladiste s")
public class Skladiste implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="SKLADISTE_SKLADISTEID_GENERATOR", sequenceName="SKLADISTE_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SKLADISTE_SKLADISTEID_GENERATOR")
	private Integer skladisteid;

	private String oznakas;

	//bi-directional many-to-one association to Mesto
	@ManyToOne
	@JoinColumn(name="mestoid")
	private Mesto mesto;

	//bi-directional many-to-one association to Radnik
	@ManyToOne
	@JoinColumn(name="radnikid")
	private Radnik radnik;

	//bi-directional many-to-one association to Sastojci
	@ManyToOne
	@JoinColumn(name="sastojciid")
	private Sastojci sastojci;

	public Skladiste() {
	}

	public Integer getSkladisteid() {
		return this.skladisteid;
	}

	public void setSkladisteid(Integer skladisteid) {
		this.skladisteid = skladisteid;
	}

	public String getOznakas() {
		return this.oznakas;
	}

	public void setOznakas(String oznakas) {
		this.oznakas = oznakas;
	}

	public Mesto getMesto() {
		return this.mesto;
	}

	public void setMesto(Mesto mesto) {
		this.mesto = mesto;
	}

	public Radnik getRadnik() {
		return this.radnik;
	}

	public void setRadnik(Radnik radnik) {
		this.radnik = radnik;
	}

	public Sastojci getSastojci() {
		return this.sastojci;
	}

	public void setSastojci(Sastojci sastojci) {
		this.sastojci = sastojci;
	}

}