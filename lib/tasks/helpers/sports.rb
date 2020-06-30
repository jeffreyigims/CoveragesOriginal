module Populator
    module Sports
  
      def create_sports
        
        @football = FactoryBot.create(:sport, name: "football")
        @baseball = FactoryBot.create(:sport, name: "baseball")

        @football_nfl = FactoryBot.create(:league, name: "NFL", sport: @football)
        @football_xfl = FactoryBot.create(:league, name: "XFL", sport: @football)
        @baseball_mlb = FactoryBot.create(:league, name: "MLB", sport: @baseball)
        @baseball_milb = FactoryBot.create(:league, name: "MiLB", sport: @baseball)

        @steelers = FactoryBot.create(:club, name: "Steelers", league: @football_nfl)
        @patriots = FactoryBot.create(:club, name: "Patriots", league: @football_nfl)
        @pirates = FactoryBot.create(:club, name: "Pirates", league: @baseball_mlb)
        @yankees = FactoryBot.create(:club, name: "Yankees", league: @baseball_mlb)

        @players = FactoryBot.create(:group, name: "players")
        @front_office = FactoryBot.create(:group, name: "front office")

        for club in [@steelers, @patriots, @pirates, @yankees]
          for group in [@players, @front_office]
            FactoryBot.create(:club_group, club: club, group: group)
          end
        end

        @life = FactoryBot.create(:category, name: "DI & Life")
        @group_health = FactoryBot.create(:category, name: "Group Health")
        @pc = FactoryBot.create(:category, name: "P&C")

        puts("Create subs")
        FactoryBot.create(:sub_category, name: "Individual Term", category: @life)
        FactoryBot.create(:sub_category, name: "Individual Term", category: @life)
        FactoryBot.create(:sub_category, name: "Whole Life", category: @life)
        FactoryBot.create(:sub_category, name: "League Wide Life", category: @life)
        FactoryBot.create(:sub_category, name: "COBRA Vendor", category: @group_health)
        FactoryBot.create(:sub_category, name: "Sponsorship", category: @group_health)
        FactoryBot.create(:sub_category, name: "Prospective Funding", category: @group_health)
        FactoryBot.create(:sub_category, name: "Retrospective Funding", category: @group_health)
        FactoryBot.create(:sub_category, name: "Employer's Liability", category: @pc)
        FactoryBot.create(:sub_category, name: "Environmental", category: @pc)
        FactoryBot.create(:sub_category, name: "Worker's Comp", category: @pc)
        FactoryBot.create(:sub_category, name: "Auto Liability", category: @pc)

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
        FactoryBot.create(:broker, name: "Jake", company: @team_scotti)
        FactoryBot.create(:broker, name: "Jim", company: @team_scotti)
        FactoryBot.create(:broker, name: "Aly", company: @nfp)
        FactoryBot.create(:broker, name: "Emily", company: @nfp)
        
      end 
    end 
end 