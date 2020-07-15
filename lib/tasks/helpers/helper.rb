module Populator
  module All
    def create_all
      @user = FactoryBot.create(:user, password: "secret", password_confirmation: "secret")

      @football = FactoryBot.create(:sport, name: "football")
      @baseball = FactoryBot.create(:sport, name: "baseball")
      @hockey = FactoryBot.create(:sport, name: "hockey")
      @soccer = FactoryBot.create(:sport, name: "soccer")

      @football_nfl = FactoryBot.create(:league, name: "NFL", sport: @football)
      @football_xfl = FactoryBot.create(:league, name: "XFL", sport: @football)
      @baseball_mlb = FactoryBot.create(:league, name: "MLB", sport: @baseball)
      @baseball_milb = FactoryBot.create(:league, name: "MiLB", sport: @baseball)
      @hockey_nhl = FactoryBot.create(:league, name: "NHL", sport: @hockey)
      @hockey_ahl = FactoryBot.create(:league, name: "AHL", sport: @hockey)
      @soccer_mls = FactoryBot.create(:league, name: "MLS", sport: @soccer)
      @soccer_nwsl = FactoryBot.create(:league, name: "NWSL", sport: @soccer)

      @steelers = FactoryBot.create(:club, name: "Steelers", league: @football_nfl)
      @patriots = FactoryBot.create(:club, name: "Patriots", league: @football_nfl)
      @pirates = FactoryBot.create(:club, name: "Pirates", league: @baseball_mlb)
      @yankees = FactoryBot.create(:club, name: "Yankees", league: @baseball_mlb)
      @penguins = FactoryBot.create(:club, name: "Penguins", league: @hockey_nhl)
      @rangers = FactoryBot.create(:club, name: "Rangers", league: @hockey_nhl)
      @united = FactoryBot.create(:club, name: "Atlanta United", league: @soccer_mls)
      @impact = FactoryBot.create(:club, name: "Montreal Impact", league: @soccer_mls)

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
      @vendor = FactoryBot.create(:sub_category, name: "COBRA Vendor", category: @group_health)
      @sponsorship = FactoryBot.create(:sub_category, name: "Sponsorship", category: @group_health)
      @prospective = FactoryBot.create(:sub_category, name: "Prospective Funding", category: @group_health)
      @retrospective = FactoryBot.create(:sub_category, name: "Retrospective Funding", category: @group_health)
      @employer = FactoryBot.create(:sub_category, name: "Employer's Liability", category: @pc)
      @environmental = FactoryBot.create(:sub_category, name: "Environmental", category: @pc)
      @compnesation = FactoryBot.create(:sub_category, name: "Worker's Comp", category: @pc)
      @auto = FactoryBot.create(:sub_category, name: "Auto Liability", category: @pc)

      puts("Create carriers")
      FactoryBot.create(:carrier, name: "BCC")
      FactoryBot.create(:carrier, name: "Highmark")
      FactoryBot.create(:carrier, name: "United Concordia")
      FactoryBot.create(:carrier, name: "PFS")

      puts("Create companies")
      @team_scotti = FactoryBot.create(:company, name: "Team Scotti")
      @nfp = FactoryBot.create(:company, name: "NFP")
      @hcc = FactoryBot.create(:company, name: "HCC")
      @pcc = FactoryBot.create(:company, name: "PCC")

      puts("Create brokers")
      @jake = FactoryBot.create(:broker, name: "Jake", company: @team_scotti)
      @jim = FactoryBot.create(:broker, name: "Jim", company: @team_scotti)
      @aly = FactoryBot.create(:broker, name: "Aly", company: @nfp)
      @emily = FactoryBot.create(:broker, name: "Emily", company: @nfp)
      @emmit = FactoryBot.create(:broker, name: "Emmit", company: @hcc)
      @tim = FactoryBot.create(:broker, name: "Tim", company: @hcc)
      @kim = FactoryBot.create(:broker, name: "Kim", company: @pcc)
      @abby = FactoryBot.create(:broker, name: "Abby", company: @pcc)
      @brokers = [@jake, @jim, @aly, @emily, @emmit, @tim, @kim, @abby]

      puts("Create coverages")
      for club in [@steelers, @patriots, @pirates, @yankees, @penguins, @rangers, @impact, @united]
        for group in [@players, @front_office, @operations, @crew]
          @club_group = FactoryBot.create(:club_group, club: club, group: group)
          for category in [@individual_term, @vendor, @employer]
            verified = rand(2) == 1 ? true : false
            @coverage = FactoryBot.create(:coverage, club_group: @club_group, sub_category: category, verified: verified)
            FactoryBot.create(:coverage_broker, coverage: @coverage, broker: @brokers[rand(@brokers.length)])
          end 
        end
      end

    end
  end
end
