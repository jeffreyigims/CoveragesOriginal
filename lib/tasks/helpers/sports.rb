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
        
      end 
    end 
end 