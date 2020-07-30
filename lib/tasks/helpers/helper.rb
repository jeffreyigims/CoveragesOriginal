module Populator
  module All
    require "faker"

    def create_all
      puts("Create users")
      @admin = FactoryBot.create(:user, first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, role: "admin", username: "user", password: "secret", password_confirmation: "secret")
      @contact_steelers = FactoryBot.create(:user, first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, role: "contact", username: "steelers", password: "secret", password_confirmation: "secret")
      @contact_pirates = FactoryBot.create(:user, first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, role: "contact", username: "pirates", password: "secret", password_confirmation: "secret")

      @football = FactoryBot.create(:sport, name: "football")
      @baseball = FactoryBot.create(:sport, name: "baseball")
      @hockey = FactoryBot.create(:sport, name: "hockey")
      @soccer = FactoryBot.create(:sport, name: "soccer")
      @basketball = FactoryBot.create(:sport, name: "basketball")
      @lacrosse = FactoryBot.create(:sport, name: "Lacrosse")

      @football_nfl = FactoryBot.create(:league, level: "1", name: "NFL", sport: @football)
      @football_xfl = FactoryBot.create(:league, level: "2", name: "XFL", sport: @football)
      @baseball_mlb = FactoryBot.create(:league, level: "1", name: "MLB", sport: @baseball)
      @baseball_milb = FactoryBot.create(:league, level: "2", name: "MiLB", sport: @baseball)
      @hockey_nhl = FactoryBot.create(:league, level: "1", name: "NHL", sport: @hockey)
      @hockey_ahl = FactoryBot.create(:league, level: "2", name: "AHL", sport: @hockey)
      @soccer_mls = FactoryBot.create(:league, level: "1", name: "MLS", sport: @soccer)
      @soccer_nwsl = FactoryBot.create(:league, level: "2", name: "NWSL", sport: @soccer)
      @basketball_nba = FactoryBot.create(:league, level: "1", name: "NBA", sport: @basketball)
      @basketball_tbt = FactoryBot.create(:league, level: "2", name: "TBT", sport: @basketball)
      @lacrosse_mll = FactoryBot.create(:league, level: "1", name: "MLL", sport: @lacrosse)
      @lacrosse_phl = FactoryBot.create(:league, level: "2", name: "PLL", sport: @lacrosse)

      @steelers = FactoryBot.create(:club, name: "Steelers", abbreviation: "STL", league: @football_nfl)
      @patriots = FactoryBot.create(:club, name: "Patriots", abbreviation: "PAT", league: @football_nfl)
      @rams = FactoryBot.create(:club, name: "Rams", abbreviation: "RMS", league: @football_nfl)
      @giants = FactoryBot.create(:club, name: "Gianta", abbreviation: "GIA", league: @football_nfl)
      @pirates = FactoryBot.create(:club, name: "Pirates", abbreviation: "PIR", league: @baseball_mlb)
      @yankees = FactoryBot.create(:club, name: "Yankees", abbreviation: "YKS", league: @baseball_mlb)
      @dodgers = FactoryBot.create(:club, name: "Dodgers", abbreviation: "YKS", league: @baseball_mlb)
      @astros = FactoryBot.create(:club, name: "Astros", abbreviation: "YKS", league: @baseball_mlb)
      @penguins = FactoryBot.create(:club, name: "Penguins", abbreviation: "PEN", league: @hockey_nhl)
      @rangers = FactoryBot.create(:club, name: "Rangers", abbreviation: "RGS", league: @hockey_nhl)
      @bruins = FactoryBot.create(:club, name: "Bruins", abbreviation: "PEN", league: @hockey_nhl)
      @capitols = FactoryBot.create(:club, name: "Capitols", abbreviation: "PEN", league: @hockey_nhl)
      @united = FactoryBot.create(:club, name: "Atlanta United", abbreviation: "AU", league: @soccer_mls)
      @impact = FactoryBot.create(:club, name: "Montreal Impact", abbreviation: "MI", league: @soccer_mls)
      @galaxy = FactoryBot.create(:club, name: "Galaxy", abbreviation: "MI", league: @soccer_mls)
      @sounders = FactoryBot.create(:club, name: "Sounders", abbreviation: "MI", league: @soccer_mls)
      @warriors = FactoryBot.create(:club, name: "Warriors", abbreviation: "AU", league: @basketball_nba)
      @heat = FactoryBot.create(:club, name: "Heat", abbreviation: "MI", league: @basketball_nba)
      @lakers = FactoryBot.create(:club, name: "Lakers", abbreviation: "MI", league: @basketball_nba)
      @cavaliers = FactoryBot.create(:club, name: "Cavaliers", abbreviation: "MI", league: @basketball_nba)
      @bayhawks = FactoryBot.create(:club, name: "Bayhawks", abbreviation: "AU", league: @lacrosse_mll)
      @hounds = FactoryBot.create(:club, name: "Hounds", abbreviation: "MI", league: @lacrosse_mll)
      @rattlers = FactoryBot.create(:club, name: "Rattlers", abbreviation: "MI", league: @lacrosse_mll)
      @blaze = FactoryBot.create(:club, name: "Blaze", abbreviation: "MI", league: @lacrosse_mll)

      FactoryBot.create(:user_club, user: @contact_steelers, club: @steelers)
      FactoryBot.create(:user_club, user: @contact_pirates, club: @pirates)

      @players = FactoryBot.create(:group, name: "players")
      @front_office = FactoryBot.create(:group, name: "front office")
      @operations = FactoryBot.create(:group, name: "operations")
      @crew = FactoryBot.create(:group, name: "crew")

      @life = FactoryBot.create(:category, name: "DI & Life")
      @group_health = FactoryBot.create(:category, name: "Group Health")
      @pc = FactoryBot.create(:category, name: "P&C")

      puts("Create subs")
      @individual_term = FactoryBot.create(:sub_category, name: "Individual Term", category: @life)
      @worker_liability = FactoryBot.create(:sub_category, name: "Worker's Liability", category: @life)
      @whole_life = FactoryBot.create(:sub_category, name: "Whole Life", category: @life)
      @league_wide_life = FactoryBot.create(:sub_category, name: "League Wide Life", category: @life)
      @league_disaster_ad = FactoryBot.create(:sub_category, name: "League Disaster AD", category: @life)
      @league_disaster_ptd = FactoryBot.create(:sub_category, name: "League Disaster PTD", category: @life)
      @vendor = FactoryBot.create(:sub_category, name: "COBRA Vendor", category: @group_health)
      @sponsorship = FactoryBot.create(:sub_category, name: "Sponsorship", category: @group_health)
      @prospective = FactoryBot.create(:sub_category, name: "Prospective Funding", category: @group_health)
      @retrospective = FactoryBot.create(:sub_category, name: "Retrospective Funding", category: @group_health)
      @dental = FactoryBot.create(:sub_category, name: "Dental", category: @group_health)
      @vision = FactoryBot.create(:sub_category, name: "Vision", category: @group_health)
      @employer = FactoryBot.create(:sub_category, name: "Employer's Liability", category: @pc)
      @environmental = FactoryBot.create(:sub_category, name: "Environmental", category: @pc)
      @compensation = FactoryBot.create(:sub_category, name: "Worker's Comp", category: @pc)
      @auto = FactoryBot.create(:sub_category, name: "Auto Liability", category: @pc)
      @medical = FactoryBot.create(:sub_category, name: "Medical", category: @pc)
      @property = FactoryBot.create(:sub_category, name: "Property", category: @pc)

      puts("Create carriers")
      @bcc = FactoryBot.create(:carrier, name: "BCC")
      @highmark = FactoryBot.create(:carrier, name: "Highmark")
      @united_concordia = FactoryBot.create(:carrier, name: "United Concordia")
      @anthem = FactoryBot.create(:carrier, name: "Anthem")
      @centene = FactoryBot.create(:carrier, name: "Centene")
      @cigna = FactoryBot.create(:carrier, name: "Cigna")
      @aetna = FactoryBot.create(:carrier, name: "Aetna")
      @united_health = FactoryBot.create(:carrier, name: "United Health")

      puts("Create companies")
      @team_scotti = FactoryBot.create(:company, name: "Team Scotti")
      @alliant = FactoryBot.create(:company, name: "Alliant")
      @associated_administrators = FactoryBot.create(:company, name: "Associated Administrators")
      @bwd = FactoryBot.create(:company, name: "BWD")
      @mj_insurance = FactoryBot.create(:company, name: "MJ Insurance")
      @usi = FactoryBot.create(:company, name: "USI")
      @wtw = FactoryBot.create(:company, name: "WTW")

      clubs = [@steelers, @patriots, @pirates, @yankees, @penguins, @rangers, @impact, @united,
               @rams, @giants, @dodgers, @astros, @bruins, @capitols, @galaxy, @sounders, @warriors,
               @heat, @lakers, @cavaliers, @bayhawks, @hounds, @rattlers, @blaze]
      groups = [@players, @front_office, @operations, @crew]
      companies = [@team_scotti, @alliant, @associated_administrators, @bwd, @mj_insurance, @usi, @wtw]
      carriers = [@bcc, @highmark, @united_concordia, @anthem, @centene, @cigna, @aetna, @united_health]
      categories = [@individual_term, @worker_liability, @whole_life, @league_wide_life, @league_disaster_ad,
                    @league_disaster_ptd, @vendor, @sponsorship, @prospective, @retrospective, @dental, @vision,
                    @employer, @environmental, @compensation, @auto, @medical, @property]

      club_groups = []
      brokers = []

      puts("Create groups for clubs")
      for club in clubs
        for group in groups
          club_groups.append(FactoryBot.create(:club_group, club: club, group: group))
        end
      end

      puts("Create brokers")
      for company in companies
        6.times do
          brokers.append(FactoryBot.create(:broker, name: Faker::Name.first_name, company: company))
        end
      end

      users = [@admin, @contact_steelers, @contact_pirates]
      puts("Create coverages")
      1000.times do
        club_group = club_groups[rand(club_groups.length)]
        carrier = carriers[rand(carriers.length)]
        broker = brokers[rand(brokers.length)]
        category = categories[rand(categories.length)]
        verified = rand(2) == 1 ? true : false
        user = users[rand(3)]
        @coverage = FactoryBot.create(:coverage, club_group: club_group, sub_category: category, verified: verified, user: user)
        FactoryBot.create(:coverage_broker, coverage: @coverage, broker: broker)
        FactoryBot.create(:coverage_carrier, coverage: @coverage, carrier: carrier)
      end
    end

    def create_base
      puts("Create users")
      @admin = FactoryBot.create(:user, first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, role: "admin", username: "user", password: "secret", password_confirmation: "secret")

      puts("Create sports")
      @baseball = FactoryBot.create(:sport, name: "baseball")

      puts("Create leagues")
      @baseball_mlb = FactoryBot.create(:league, level: "1", name: "MLB", sport: @baseball)
      @baseball_milb = FactoryBot.create(:league, level: "2", name: "MiLB", sport: @baseball)

      mlb_teams = ["Arizona Diamondbacks", "Atlanta Braves", "Baltimore Orioles", "Boston Red Sox", "Chicago White Sox",
                   "Chicago Cubs", "Cincinnati Reds", "Cleveland Indians", "Colorado Rockies", "Detroit Tigers", "Houston Astros",
                   "Kansas City Royals", "Los Angeles Angels", "Los Angeles Dodgers", "Miami Marlins", "Milwaukee Brewers",
                   "Minnesota Twins", "New York Yankees", "New York Mets", "Oakland Athletics", "Philadelphia Phillies",
                   "Pittsburgh Pirates", "San Diego Padres", "San Francisco Giants", "Seattle Mariners", "St. Louis Cardinals",
                   "Tampa Bay Rays", "Texas Rangers", "Toronto Blue Jays", "Washington Nationals"]
      carriers = ["BCC", "Highmark", "United Concordia", "Davis Vision", "PFS", "Lloyds", "TMHCC", "MetLife", "Guardian",
                  "Dearborn", "Unum", "ProBenefits", "Benefits Administrators", "The Standard"]

      puts("Create groups")
      @players = FactoryBot.create(:group, name: "players")
      @front_office = FactoryBot.create(:group, name: "front office")

      puts("Create clubs")
      for team in mlb_teams
        @club = FactoryBot.create(:club, name: team, abbreviation: "", league: @baseball_mlb)
        FactoryBot.create(:club_group, club: @club, group: @players)
        FactoryBot.create(:club_group, club: @club, group: @front_office)
      end

      puts("Create carriers")
      for carrier in carriers
        FactoryBot.create(:carrier, name: carrier)
      end

      puts("Create companies")
      @company = FactoryBot.create(:company, name: "Team Scotti")
      FactoryBot.create(:broker, name: "John Scotti", company: @company)

      puts("Create categories")
      @life = FactoryBot.create(:category, name: "DI & Life")
      @group_health = FactoryBot.create(:category, name: "Group Health")
      @pc = FactoryBot.create(:category, name: "P&C")

      subs = [["Aggregate League Wide Life Excess", "League Disaster AD", "League Disaster PTD", "League Wide Life", "Group CAP Rider",
               "Roster AD Excess League Wide Life", "Individual AD/CAP", "Whole Life ", "Executive Excess Disability"],
              ["COBRA Vendor", "Medical", "Dental", "Health Reimbursement Account", "Vision", "$10,000 Wellness Credit", "ACA Value Plan",
               "Covid-19 Premium Deferral", "Life/AD&D/LTD/STD", "Retrospective Funding", "Team Scotti Perks", "Preventive Schedule Rider",
               "Prospective Funding", "Health Spending Account", "Flexible Spending Account", "Sponsorship "]]

      puts("Create subs")
      for sub in subs[0]
        FactoryBot.create(:sub_category, name: sub, category: @life)
      end

      for sub in subs[1]
        FactoryBot.create(:sub_category, name: sub, category: @group_health)
      end
    end
  end
end
