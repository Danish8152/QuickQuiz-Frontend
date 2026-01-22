import React from 'react';
import { Trophy, Clock, Users, Calendar, Award, Medal } from 'lucide-react';

const Challenge = () => {
    // Static leaderboard data
    const leaderboardData = [
        { rank: 1, name: "Alex Rodriguez", score: 2450, avatar: "AR" },
        { rank: 2, name: "Sarah Chen", score: 2380, avatar: "SC" },
        { rank: 3, name: "Mike Johnson", score: 2290, avatar: "MJ" },
        { rank: 4, name: "Emma Davis", score: 2150, avatar: "ED" },
        { rank: 5, name: "David Wilson", score: 2080, avatar: "DW" }
    ];

    const getRankIcon = (rank) => {
        switch (rank) {
            case 1: return <Trophy className="text-warning" style={{ width: '20px', height: '20px' }} />;
            case 2: return <Medal className="text-secondary" style={{ width: '20px', height: '20px' }} />;
            case 3: return <Award className="text-warning-emphasis" style={{ width: '20px', height: '20px' }} />;
            default: return <span className="badge bg-secondary rounded-pill">#{rank}</span>;
        }
    };

    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />

            <div className="container-fluid min-vh-100 pt-5 mt-5 bg-black">
                <div className="container">
                    <div className="text-center mb-5">
                        <h1 className="display-4 fw-semibold fs-1 mb-3">Challenge of the day</h1>
                        <p className="fs-5">Compete with the best minds worldwide</p>
                    </div>

                    <div className="row g-4">
                        {/* Contest Details Section */}
                        <div className="col-lg-6">
                            <div className="shadow-sm h-100">
                                <div className="card-body">
                                    <div className="d-flex align-items-center mb-4">
                                        <Calendar className="text-primary me-3" style={{ width: '32px', height: '32px' }} />
                                        <h2 className="card-title h3 mb-0">Contest Details</h2>
                                    </div>

                                    {/* Contest Status */}
                                    <div className="alert bg-success d-flex align-items-center mb-4">
                                        <div className="spinner-grow spinner-grow-sm text-danger me-2" role="status"></div>
                                        <div className=''>
                                            <strong className=''>Contest Live</strong>
                                            <div className="small">Competition is currently ongoing</div>
                                        </div>
                                    </div>

                                    {/* Timing Information */}
                                    <div className="row g-4">
                                        <div className="col-12">
                                            <div className="ps-3 mb-4">
                                                <div className="d-flex align-items-center mb-2">
                                                    <Clock className="text-primary me-2" style={{ width: '20px', height: '20px' }} />
                                                    <h5 className="mb-0">Duration</h5>
                                                </div>
                                                <p className="mb-1">1 Hours</p>
                                                <small className="d-block">Started: Sept 18, 2025 - 2:00 PM UTC</small>
                                                <small className="">Ends: Sept 18, 2025 - 5:00 PM UTC</small>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="ps-3 mb-4">
                                                <div className="d-flex align-items-center mb-2">
                                                    <Users className="me-2" style={{ width: '20px', height: '20px', color: '#6f42c1' }} />
                                                    <h5 className="mb-0">Participants</h5>
                                                </div>
                                                <p className="mb-1">1,247 Registered</p>
                                                <small className="">892 Currently Active</small>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="ps-3 mb-4">
                                                <div className="d-flex align-items-center mb-2">
                                                    <Award className="text-warning me-2" style={{ width: '20px', height: '20px' }} />
                                                    <h5 className="mb-0">Prizes</h5>
                                                </div>
                                                <div className="mb-2">
                                                    <div className="mb-1">🥇 1st Place: $5,000 + Trophy</div>
                                                    <div className="mb-1">🥈 2nd Place: $3,000 + Medal</div>
                                                    <div className="mb-1">🥉 3rd Place: $1,000 + Medal</div>
                                                    <small className="">Top 10 receive certificates</small>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="col-12">
                                            <div className="d-grid gap-2 d-md-flex">
                                                <button className="btn btn-primary flex-fill">View Problems</button>
                                                <button className="btn btn-secondary flex-fill">Submit Solution</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Leaderboard Section */}
                        <div className="col-lg-6">
                            <div className="shadow-sm h-100">
                                <div className="card-body">
                                    <div className="d-flex align-items-center mb-4 bg-transparent">
                                        <Trophy className="text-warning me-3 bg-transparent" style={{ width: '32px', height: '32px' }} />
                                        <h2 className="card-title h3 mb-0">Leaderboard</h2>
                                    </div>

                                    <div className="d-flex flex-column gap-4">
                                        {leaderboardData.map((participant) => (
                                            <div
                                                key={participant.rank}
                                                className={` ${(participant.rank)}`}
                                            >
                                                <div className="card-body py-3 ">
                                                    <div className="d-flex align-items-center">
                                                        <div className="me-3">
                                                            {getRankIcon(participant.rank)}
                                                        </div>

                                                        <div className="me-3">
                                                            <div
                                                                className="rounded-circle d-flex align-items-center justify-content-center text-white fw-semibold"
                                                                style={{
                                                                    width: '40px',
                                                                    height: '40px',
                                                                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
                                                                }}
                                                            >
                                                                {participant.avatar}
                                                            </div>
                                                        </div>

                                                        <div className="">
                                                            <h6 className="mb-0">{participant.name}</h6>
                                                            <small className="">Rank #{participant.rank}</small>
                                                        </div>

                                                        <div className="text-end">
                                                            <div className="fs-5 fw-bold">{participant.score}</div>
                                                            <small className="">points</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="text-center mt-5">
                                        <button className="btn btn-primary">View Full Leaderboard</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Stats */}
                    <div className="row g-3 mt-4">
                        <div className="col-md-4">
                            <div className="text-center shadow-sm">
                                <div className="card-body">
                                    <div className="display-4 fw-bold text-primary mb-2">5</div>
                                    <div className="">Problems</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="text-center shadow-sm">
                                <div className="card-body">
                                    <div className="display-4 fw-bold text-success mb-2">67%</div>
                                    <div className="">Success Rate</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="text-center shadow-sm">
                                <div className="card-body">
                                    <div className="display-4 fw-bold" style={{ color: '#6f42c1' }}>156</div>
                                    <div className="">Submissions</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Challenge;