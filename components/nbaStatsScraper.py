import requests 

url = "https://stats.nba.com/stats/scoreboardV2?DayOffset=0&LeagueID=00&gameDate=03/03/2019"

headers = {
    "content-type": "application/json"
}

data = requests.get(url, headers=self.headers)
games = data["resultSets"][0]["rowSets"]

for i in range(0, len(games)):
    game_id = games[i][2]
    game_ids.append(game_id)

with self.conn.cursor() as cursor:
    query = "INSERT INTO Games (GameId) VALUES (%s)"
    params = [(id, ) for id in game_ids]
    cursor.executemany(query, params)
    self.conn.commit()

def fetch_game_ids(self):
    with self.conn.cursor() as cursor:
        query = "SELECT GameId FROM Games"
        cursor.execute(query)
        return[r[0] for r in cursor.fetchall()]

def make_game_request(self, game_id):
    sleep(1)
    url = "https://stats.nba.com/stats/boxscoresummaryv2?GameID={game_id}".format(game_id=str(game_id))
    return requests.get(url, headers=self.headers)

def game_details(self):
    game_ids = self.fetch_game_ids()
    for id in game_ids:
        data = self.make_game_requests(id).json()

    with self.conn.cursor() as cursor:
        query = ("INSERT IGNORE INTO GameStats ("
                "GameId, GameDate, AwayTeam, HomeTeam, LastMeetingWinner, Q1AwayPts, "
                "Q2AwayPts, Q3AwayPts, Q4AwayPts, Q1HomePts, Q2HomePts, Q3HomePts, Q4HomePts, "
                "Referee1, Referee2, Referee3, TimesTied, LeadChanges, Winner"
                ") VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)")
        params = self.filter_details(data)
        cursor.execute(query, params)
        self.conn.commit()